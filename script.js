/**
 * EduGenie — chat interactions
 * Talks to the FastAPI backend:
 *   POST /ask      -> { response: string }
 *   GET  /history   -> { messages: [...] }
 */

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  initSidebarToggle();
  initChatInput();
});

/* ---------------------------------------------------------------- */
/* Mobile sidebar                                                    */
/* ---------------------------------------------------------------- */

function initSidebarToggle() {
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const overlay = document.querySelector("[data-sidebar-overlay]");

  const closeSidebar = () => document.body.classList.remove("sidebar-open");
  const openSidebar = () => document.body.classList.add("sidebar-open");

  menuBtn?.addEventListener("click", () => {
    document.body.classList.contains("sidebar-open") ? closeSidebar() : openSidebar();
  });

  overlay?.addEventListener("click", closeSidebar);
}

/* ---------------------------------------------------------------- */
/* Chat input + sending messages                                     */
/* ---------------------------------------------------------------- */

function initChatInput() {
  const form = document.querySelector("[data-chat-form]");
  const textarea = document.querySelector("[data-chat-textarea]");
  const sendBtn = document.querySelector("[data-chat-send]");
  const chatArea = document.querySelector("[data-chat-area]");
  const messageList = document.querySelector("[data-message-list]");
  const emptyState = document.querySelector("[data-empty-state]");

  if (!form || !textarea) return;

  // Autosize the textarea as the user types
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px";
    sendBtn.disabled = textarea.value.trim().length === 0;
  });

  // Enter sends, Shift+Enter adds a newline
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  // Suggested prompt cards fill the input
  document.querySelectorAll("[data-suggested-prompt]").forEach((card) => {
    card.addEventListener("click", () => {
      textarea.value = card.dataset.suggestedPrompt;
      textarea.dispatchEvent(new Event("input"));
      textarea.focus();
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = textarea.value.trim();
    if (!question) return;

    emptyState?.setAttribute("hidden", "");
    ensureMessageList();

    appendMessage("user", question);
    textarea.value = "";
    textarea.style.height = "auto";
    sendBtn.disabled = true;

    const typingId = appendTypingIndicator();

    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      removeTypingIndicator(typingId);
      appendMessage("ai", data.response ?? "Sorry, something went wrong.");
    } catch (err) {
      removeTypingIndicator(typingId);
      appendMessage(
        "ai",
        "I couldn't reach the server just now. Please try again in a moment."
      );
    }
  });

  function ensureMessageList() {
    if (messageList) return;
  }

  function appendMessage(role, text) {
    const list = document.querySelector("[data-message-list]") || createMessageList();

    const message = document.createElement("div");
    message.className = `message message--${role}`;

    if (role === "ai") {
      message.innerHTML = `
        <div class="message__avatar">
          <i data-lucide="sparkles"></i>
        </div>
        <div class="message__body">
          <div class="message__author">EduGenie</div>
          <div class="message__bubble">${formatText(text)}</div>
        </div>`;
    } else {
      message.innerHTML = `
        <div class="message__body">
          <div class="message__author">You</div>
          <div class="message__bubble">${formatText(text)}</div>
        </div>`;
    }

    list.appendChild(message);
    if (window.lucide) lucide.createIcons();
    scrollToBottom();
  }

  function createMessageList() {
    const list = document.createElement("div");
    list.className = "message-list";
    list.setAttribute("data-message-list", "");
    chatArea.querySelector(".chat-area__inner").appendChild(list);
    return list;
  }

  function appendTypingIndicator() {
    const list = document.querySelector("[data-message-list]") || createMessageList();
    const id = "typing-" + Date.now();
    const el = document.createElement("div");
    el.className = "message message--ai";
    el.id = id;
    el.innerHTML = `
      <div class="message__avatar"><i data-lucide="sparkles"></i></div>
      <div class="message__body">
        <div class="message__author">EduGenie</div>
        <div class="message__bubble">
          <div class="typing-indicator"><span></span><span></span><span></span></div>
        </div>
      </div>`;
    list.appendChild(el);
    if (window.lucide) lucide.createIcons();
    scrollToBottom();
    return id;
  }

  function removeTypingIndicator(id) {
    document.getElementById(id)?.remove();
  }

  function scrollToBottom() {
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  // Minimal escaping + support for simple ```code``` blocks and "- " bullet lists
  function formatText(raw) {
    const escaped = raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const withCodeBlocks = escaped.replace(
      /```([\s\S]*?)```/g,
      (_, code) => `<pre><code>${code.trim()}</code></pre>`
    );

    const lines = withCodeBlocks.split("\n");
    let html = "";
    let inList = false;

    for (const line of lines) {
      if (/^\s*-\s+/.test(line)) {
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += `<li>${line.replace(/^\s*-\s+/, "")}</li>`;
      } else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        if (line.trim() !== "") html += `<p>${line}</p>`;
      }
    }
    if (inList) html += "</ul>";
    return html || escaped;
  }
}
