# EduGenie — Frontend

A minimal, ChatGPT/Gemini-style interface for an AI learning assistant, built with
Jinja2 templates and vanilla CSS/JS, ready to plug into a FastAPI backend.

## Structure

```
edugenie/
├── main.py                     # minimal FastAPI app (GET /, POST /ask, GET /history)
├── templates/
│   ├── base.html                # <head>, fonts, CSS/JS includes, {% block body %}
│   ├── index.html                # extends base.html, assembles the page
│   ├── navbar.html               # mobile-only top bar with hamburger menu
│   ├── sidebar.html              # logo, new chat, recent chats, settings
│   └── chat.html                 # message list / empty state / input box
├── static/
│   ├── css/style.css             # all styling — design tokens at the top
│   └── js/script.js              # sidebar toggle, sending messages, typing indicator
├── preview.html                  # static preview with a sample conversation
└── preview-empty-state.html      # static preview of the empty (first-visit) state
```

`preview.html` and `preview-empty-state.html` have no Jinja syntax and no backend —
open either directly in a browser to see the design with sample data.

## Wiring to FastAPI

`main.py` shows the minimal setup:

- **`GET /`** — renders `index.html` with `username`, `messages`, and `recent_chats`.
- **`POST /ask`** — accepts `{ "question": "..." }`, calls Gemini, returns
  `{ "response": "..." }`. `static/js/script.js` already calls this endpoint and
  appends both the user's question and the AI's reply to the page, showing the
  three-dot typing indicator while it waits.
- **`GET /history`** — returns stored messages, e.g. to restore a session on load.

To connect the real model, replace the placeholder in `main.py`:

```python
import google.generativeai as genai

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

@app.post("/ask")
async def ask(payload: AskRequest):
    result = model.generate_content(payload.question)
    return {"response": result.text}
```

## Template placeholders

| Placeholder      | Type                        | Used in                     |
|-------------------|------------------------------|------------------------------|
| `{{ username }}`  | string                      | `sidebar.html`               |
| `{{ messages }}`  | list of `{role, content}`   | `chat.html`                  |
| `{{ recent_chats }}` | list of `{id, title}`    | `sidebar.html`               |
| `{{ response }}`  | string (optional)           | available if you want to render the latest AI reply separately |

## Run it

```bash
pip install fastapi uvicorn jinja2 python-multipart
uvicorn main:app --reload
```

Then visit `http://127.0.0.1:8000`.

## Design notes

- Font: **Inter**, loaded from Google Fonts.
- Icons: **Lucide**, loaded via the `lucide` UMD build and initialized with
  `lucide.createIcons()`.
- Colors, spacing, and radii are defined as CSS custom properties at the top of
  `style.css` — change them there to retheme the whole app.
- Sidebar collapses behind a hamburger menu (`navbar.html`) under 768px; the chat
  input stays fixed to the bottom of the viewport at every size.
