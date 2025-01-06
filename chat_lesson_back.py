import asyncio
import socketio
from aiohttp import web
from ollama import AsyncClient
import subprocess
import requests
import json
import re
from pptx import Presentation
from pptx.util import Inches
from io import BytesIO
from ollama import chat
from ollama import ChatResponse


sio = socketio.AsyncServer(cors_allowed_origins=['https://teach.cograd.in', 'http://localhost:3000'])
app = web.Application()
sio.attach(app)
pattern = r"(?<!\\)'(.*?)'(?!\\)"

CHAT_MODEL = "allrounder"
LESSON_PLAN_MODEL = "llama-lesson"
PPT_GEN_MODE = "ppt_generator"

async def generate_ai_response(prompt, model):
    message = {'role': 'user', 'content': prompt}
    try:
        async for part in await AsyncClient().chat(model=model, messages=[message], stream=True):
            if model == PPT_GEN_MODE and ']' in part['message']['content'] :
                yield part['message']['content']
                break
            yield part['message']['content']
    except Exception as e:
        print(f"Error in generate_ai_response: {e}")
        yield f"Error: {str(e)}"


def get_transcript(video_id):
    headers = {
        "Content-Type": "application/json"
    }
    url = "https://asia-south2-quickjam-host.cloudfunctions.net/function-1"
    response = requests.post(url, headers=headers, json={"name": video_id}, timeout=70)
    transcript = ""
    for el in json.loads(response.text.replace("'", "\'")):
        transcript = transcript + el['text']
    return transcript
        
@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

@sio.event
async def request(sid, data):
    type = data.get('type')
    prompt = data.get('message')
    if not type:
        await sio.emit('error', {"message": "Invalid request format"}, room=sid)
        return

    if type == "chat":
        model = CHAT_MODEL
        language = data.get('language')
        classNumber = data.get('classNumber')
        subject = data.get('subject')

        prompt = f"""You are a dedicated teaching assistant from India, well-versed in the NCEF 2023 curriculum, following NCERT books and you are supporting a teacher in teaching {subject} to {classNumber}. 
        While I am knowledgeable in many areas, my strength lies in addressing questions related to teaching. 
        Please answer the following question:
        {prompt}
        Always provide your response in {language}. If the question pertains to 3D models, simply mention that you are sharing a 3D model and exclude it from your detailed response.
        """
    
    elif type == "lesson_plan":
        model = LESSON_PLAN_MODEL
        classNumber = data.get('classNumber')
        subject = data.get('subject')
        chapter = data.get('selectedTopic')
        language = data.get('language')
        bias_type = data.get('theme')
        prompt = f"Generate lesson plan for Class{classNumber} students about subject: {subject} chapter: {chapter} focussing on {bias_type}."
        print(prompt)

    elif type == "youtube_summ":
        print(data)
        model = CHAT_MODEL
        request_url = data.get('videoURL')
        classNumber = data.get('classNumber')
        subject = data.get('subject')
        language = data.get('language')
        video_id = request_url.split("=")[1]
        transcript = get_transcript(video_id)
        prompt = f"{transcript}\n\n Generate a summary for the above youtube transcript and answer in properly defined pointers."
        print(prompt)

    elif type == "ppt_outline":
        model = PPT_GEN_MODE
        classNumber = data.get('classNumber')
        subject = data.get('subject')
        language = data.get('language')
        chapter = data.get("selectedTopic")
        bias_type = data.get('theme')
        prompt = f"Generate the titles of a presentation for teaching Class{classNumber} students about subject: {subject} chapter: {chapter} focussing on {bias_type}."

    else:
        await sio.emit('error', {"message": "Invalid request type"}, room=sid)
        return
    print(f"Processing {type} request with model {model}")

    try:
        index = 0
        if type != 'ppt_outline':
            async for response_part in generate_ai_response(prompt, model):
                if index == 0:
                    await sio.emit('response', {
                    "type": type,
                    "content": "[START]"
                    }, room=sid)
                await sio.emit('response', {
                    "type": type,
                    "content": response_part
                }, room=sid)
                index+=1

            await sio.emit('response', {
                "type": type,
                "content": "[DONE]"
            }, room=sid)
        else:
            outline_buffer = ""
            async for response_part in generate_ai_response(prompt, model):
                outline_buffer = outline_buffer + response_part
            outline_buffer = '[' + outline_buffer.split('[')[1]
            pattern = r"(?<!\\)'(.*?)'(?!\\)"

            outline_buffer = re.sub(pattern, r'"\1"', outline_buffer)

            json_buffer = json.loads(outline_buffer)

            await sio.emit('response', {
                    "type": type,
                    "content": json_buffer
                }, room=sid)

        print(f"Completed {type} request")
    except Exception as e:
        print(f"Error processing request: {e}")
        await sio.emit('error', {"message": f"Server error: {str(e)}"}, room=sid)



async def handle(request):
    # Extract parameters from the request
    params = await request.json()
    slides_data = params.get('pptOutline', [])
    classNumber = params.get('classNumber')
    subject = params.get('subject')
    chapter = params.get("selectedTopic")
    bias_type = params.get('theme')
    print(subject)
    slide_full_data = []
    for slide in slides_data:
        print(slide)
        response: ChatResponse = chat(model='allrounder', messages=[
                {
                'role': 'user',
                'content': f"""Create concise points (not more than 4) for the slide titled {slide}.
                This slide will be used by a teacher to teach students of Class{classNumber} {subject}, {chapter}
                format the response in points only. Always stick to concise points and don't add anything apart from the points. 
                Try to incorporate {bias_type} where possible.""",
                },
            ])
        slide_full_data.append({"title":slide, "content":  response['message']['content']})
        print(response['message']['content'])
    template_path = 'template.pptx'
    prs = Presentation(template_path)

    slide_layout = prs.slide_layouts[0]  # Choosing a layout with title and content
    slide = prs.slides.add_slide(slide_layout)

    title_placeholder = slide.shapes.title
    title_placeholder.text = chapter

    content_placeholder = slide.placeholders[1]
    content_placeholder.text = f"{subject} - {classNumber}"
    # Process each slide
    for slide_info in slide_full_data:
        title = slide_info.get('title', 'Default Title')
        content = slide_info.get('content', 'Default Content')

        # Add a new slide
        print(prs.slide_layouts[2])
        slide_layout = prs.slide_layouts[2]  # Choosing a layout with title and content
        slide = prs.slides.add_slide(slide_layout)

        # Add title and content
        title_placeholder = slide.shapes.title
        title_placeholder.text = title

        content_placeholder = slide.placeholders[1]
        content_placeholder.text = content
    # Save the presentation to a bytes buffer
    pptx_io = BytesIO()
    prs.save(pptx_io)
    pptx_io.seek(0)

    # Save the presentation locally
    local_save_path = f'{chapter}.pptx'
    with open(local_save_path, 'wb') as f:
        f.write(pptx_io.getvalue())

    # Prepare the response with the PowerPoint file
    pptx_io.seek(0)  # Reset buffer position to the start
    return web.Response(body=pptx_io, headers={
        'Content-Disposition': 'attachment; filename="generated.pptx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    })

app.router.add_post('/ppt-generator/generate-ppt', handle)



if __name__ == '__main__':
    web.run_app(app, port=8910)
    