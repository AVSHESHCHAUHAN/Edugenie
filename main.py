"""
EduGenie — minimal FastAPI backend wiring for the templates in this project.

Run with:
    uvicorn main:app --reload

Folder layout expected:
    main.py
    templates/  (base.html, index.html, navbar.html, sidebar.html, chat.html)
    static/     (css/style.css, js/script.js)
"""

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

# Swap this for the real Gemini client, e.g.:
# import google.generativeai as genai
# genai.configure(api_key=os.environ["GEMINI_API_KEY"])
# model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI(title="EduGenie")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# In-memory store for demo purposes — replace with a real database.
CHAT_HISTORY: list[dict] = []
RECENT_CHATS: list[dict] = [
    # {"id": "1", "title": "Explain photosynthesis"},
]


class AskRequest(BaseModel):
    question: str


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    """Render the main chat page."""
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "username": "Student",
            "messages": CHAT_HISTORY,
            "recent_chats": RECENT_CHATS,
        },
    )


@app.post("/ask")
async def ask(payload: AskRequest):
    """Send the user's question to Gemini and return the answer."""
    question = payload.question.strip()

    CHAT_HISTORY.append({"role": "user", "content": question})

    # Replace this with a real call to the Gemini API, e.g.:
    # result = model.generate_content(question)
    # answer = result.text
    answer = f"This is a placeholder answer for: “{question}”."

    CHAT_HISTORY.append({"role": "ai", "content": answer})

    return {"response": answer}


@app.get("/history")
async def history():
    """Return the stored chat history, e.g. for restoring a session."""
    return {"messages": CHAT_HISTORY}
