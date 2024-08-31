const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const path = require("path");

const USER_ID = uuidv4();
const app = express();
// const upload = multer({ storage: multer.memoryStorage() });

// app.use(
//   cors({
//     origin: process.env.ALLOWED_ORIGIN || "http://localhost:5500",
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true,
//  }
//  ))
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
//60 second timeout for browser support because api call takes a lot of time.
app.use((req, res, next) => {
  res.setTimeout(60000, () => {
    console.log("Request has timed out.");
    res.sendStatus(408);
  });
  next();
});

app.post("/voiceflow", async (req, res) => {
  const { text } = req.body;
  const projectId = "66d20b71a0ae310266c219d0";
  const authKey = "VF.DM.66d2b8815a38744f37738f6e.9dipbIRsunGudDVk";
  const versionID = "66d20b71a0ae310266c219d1";
  const url = `https://general-runtime.voiceflow.com/state/user/${USER_ID}/interact`;
  const voiceflowEndpoint = url;
  // const data = {
  //   action: {
  //     type: "text",
  //     payload: text,
  //   },
  //   projectId: projectId,
  //   versionID: versionID,
  // };
  // const url = 'https://general-runtime.voiceflow.com/state/user/userID/interact?logs=off';
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      versionId: "production",
      "content-type": "application/json",
      Authorization: authKey,
    },
    body: JSON.stringify({
      action: { type: "text", payload: text },
      config: {
        tts: false,
        stripSSML: true,
        stopAll: true,
        excludeTypes: ["block", "debug", "flow"],
      },
    }),
  };

  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((json) => console.log(json))
  //   .catch((err) => console.error("error:" + err));

  const response = await fetch(url, options);
  console.log(response);
  if (response.ok) {
    res.json(await response.json());
  } else {
    res.status(response.status).json({ error: "Error from Voiceflow API" });
  }
});
app.get("/voiceflow", async (req, res) => {
  const projectId = "66d20b71a0ae310266c219d0";
  const authKey = "VF.DM.66d2b8815a38744f37738f6e.9dipbIRsunGudDVk";
  const versionID = "66d20b71a0ae310266c219d1";
  const url = `https://general-runtime.voiceflow.com/state/user/${USER_ID}/interact`;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      versionId: "production",
      "content-type": "application/json",
      Authorization: authKey,
    },
    body: JSON.stringify({
      action: { type: "launch" },
      config: {
        tts: false,
        stripSSML: true,
        stopAll: true,
        excludeTypes: ["block", "debug", "flow"],
      },
    }),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      res.status(response.status).json({ error: "Error from Voiceflow API" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = {
  USER_ID,
};
