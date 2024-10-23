import asyncio
import socketio
from aiohttp import web
from ollama import AsyncClient
import subprocess
import requests
import json

sio = socketio.AsyncServer(cors_allowed_origins='https://medha.cograd.in')
app = web.Application()
sio.attach(app)

CHAT_MODEL = "allrounder"
LESSON_PLAN_MODEL = "llama-lesson"

async def generate_ai_response(prompt, model):
    message = {'role': 'user', 'content': prompt}
    try:
        async for part in await AsyncClient().chat(model=model, messages=[message], stream=True):
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

        prompt = f"""You are helpful teacher assistant from India who knows NCEF 2023 well and is helping a teacher for {classNumber} {subject}. Answer the following question:
        {prompt}
        Always answer in {language}. If the question mentions 3d models, Just say you're sharing a 3d model and don't consider it for answering.
        """
    
    elif type == "lesson_plan":
        model = LESSON_PLAN_MODEL
        classNumber = data.get('classNumber')
        subject = data.get('subject')
        chapter = data.get('selectedTopic')
        language = data.get('language')
        prompt = f"Generate lesson plan for Class{classNumber} students about subject: {subject} chapter: {chapter}."

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

    else:
        await sio.emit('error', {"message": "Invalid request type"}, room=sid)
        return
    print(f"Processing {type} request with model {model}")

    try:
        index = 0
        print(index)
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

        print(f"Completed {type} request")
    except Exception as e:
        print(f"Error processing request: {e}")
        await sio.emit('error', {"message": f"Server error: {str(e)}"}, room=sid)

if __name__ == '__main__':
    web.run_app(app, port=8910)