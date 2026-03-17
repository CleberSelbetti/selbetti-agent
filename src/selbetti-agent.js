class SelbettiAgent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
  }

  connectedCallback() {
    this.apiUrl = this.getAttribute("api-url");
    this.apiKey = this.getAttribute("api-key");
    this.schemaFile = this.getAttribute("schema-file");
    this.dataFile = this.getAttribute("data-file");
    this.datasetId = this.getAttribute("dataset-id");

    this.shadowRoot.innerHTML = `
      <style>

        .component{
          position:fixed;
          bottom:20px;
          right:20px;
          z-index:9999;
        }

        .floating-btn {
          width:60px;
          height:60px;
          border-radius:50%;
          background-image:url("https://nexcore.selbetti.com.br:3002/chat/widget/icone/1");
          background-size:cover;
          background-position:center;
          border:none;
          cursor:pointer;
          box-shadow:0 4px 12px rgba(0,0,0,0.3);
          position:relative;
        }

        .floating-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          filter: grayscale(1);
        }

        .icon-drag{
          position:absolute;
          top:-6px;
          right:-14px;
          width:22px;
          height:22px;
          border-radius:50%;
          background:#007548;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:grab;
          box-shadow:0 2px 6px rgba(0,0,0,0.25);
        }

        .icon-drag:active{
          cursor:grabbing;
        }

        .modal {
          position:fixed;
          width:400px;
          background:white;
          border-radius:12px;
          box-shadow:0 10px 30px rgba(0,0,0,0.3);
          padding:16px;
          display:flex;
          flex-direction:column;
          z-index:9999;
          font-family:Arial,sans-serif;

          opacity:0;
          transform:translateY(20px) scale(.9);
          transform-origin:bottom center;
          pointer-events:none;

          transition:
          transform .22s cubic-bezier(.34,1.56,.64,1),
          opacity .18s ease;
        }

        .modal.open{
          opacity:1;
          transform:translateY(0) scale(1);
          pointer-events:auto;
        }

        .modal-header {
          display: flex;
          justify-content: right;
          align-items: center;
          margin-bottom: 10px;
          cursor: grab;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }

        textarea {
          width: 100%;
          min-height: 100px;
          margin-bottom: 10px;
        }

        button.send {
          background: #007548;
          color: white;
          border: none;
          padding: 8px;
          cursor: pointer;
          border-radius: 6px;
        }

        .chat-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: 250px;
          overflow-y: auto;
          margin-bottom: 10px;
          padding-right: 4px;
        }

        .message {
          max-width: 75%;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 14px;
          word-wrap: break-word;
          white-space: pre-line; /* respeita \n automaticamente */
        }

        .message.user {
          align-self: flex-end;
          background: #007548;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.bot {
          align-self: flex-start;
          background: #f1f1f1;
          color: #333;
          border-bottom-left-radius: 4px;
        }

        .typing {
          align-self: flex-start;
          background: #f1f1f1;
          padding: 10px 14px;
          border-radius: 12px;
          border-bottom-left-radius: 4px;
          display: inline-flex;
          gap: 5px;
        }

        .typing span {
          width: 6px;
          height: 6px;
          background: #777;
          border-radius: 50%;
          animation: blink 1.4s infinite both;
        }

        .typing span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes blink {
          0%   { opacity: 0.2; transform: translateY(0px); }
          20%  { opacity: 1; transform: translateY(-3px); }
          100% { opacity: 0.2; transform: translateY(0px); }
        }

      </style>

      <div class="component">
        <button class="floating-btn">
          <div class="icon-drag">
            <svg width="14" height="14" viewBox="0 0 20 20">
              <circle cx="5" cy="5" r="1.5" fill="white"/>
              <circle cx="10" cy="5" r="1.5" fill="white"/>
              <circle cx="15" cy="5" r="1.5" fill="white"/>
              <circle cx="5" cy="10" r="1.5" fill="white"/>
              <circle cx="10" cy="10" r="1.5" fill="white"/>
              <circle cx="15" cy="10" r="1.5" fill="white"/>
            </svg>
          </div>
        </button>
      </div>
 

      <div class="modal">
        <div class="modal-header">
          <button class="close-btn">X</button>
        </div>

        <div class="chat-container" id="chatContainer"></div>

        <textarea id="jsonInput" placeholder="Digite sua pergunta."></textarea>
        <button id="sendBtn" class="send">Enviar</button>
      </div>
    `;

    this.floatingBtn = this.shadowRoot.querySelector(".floating-btn");
    const dragIcon = this.shadowRoot.querySelector(".icon-drag");
    this.uploadFiles();

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let hasMoved = false;

    dragIcon.addEventListener("mousedown", (e) => {
      isDragging = true;

      const rect = this.floatingBtn.getBoundingClientRect();

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      e.stopPropagation();
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      hasMoved = true;

      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      const component = this.shadowRoot.querySelector(".component");

      component.style.left = x + "px";
      component.style.top = y + "px";
      component.style.right = "auto";
      component.style.bottom = "auto";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;

      setTimeout(() => {
        hasMoved = false;
      }, 50);
    });

    this.shadowRoot
      .querySelector(".floating-btn")
      .addEventListener("click", (e) => {
        if (hasMoved) {
          hasMoved = false;
          return;
        }

        this.toggleModal();
      });

    this.shadowRoot
      .querySelector(".close-btn")
      .addEventListener("click", () => this.toggleModal());

    this.shadowRoot
      .getElementById("sendBtn")
      .addEventListener("click", () => this.sendQuestion());
  }

  toggleModal() {
    const modal = this.shadowRoot.querySelector(".modal");
    const btn = this.shadowRoot.querySelector(".floating-btn");

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      modal.classList.add("open");

      const rect = btn.getBoundingClientRect();
      const modalRect = modal.getBoundingClientRect();

      let left = rect.left + rect.width / 2 - modalRect.width / 2;
      let top = rect.top - modalRect.height - 10;

      if (left < 10) left = 10;
      if (left + modalRect.width > window.innerWidth) {
        left = window.innerWidth - modalRect.width - 10;
      }

      if (top < 10) {
        top = rect.bottom + 50;
      }

      modal.style.left = `${left}px`;
      modal.style.top = `${top - 50}px`;
      modal.style.right = "auto";
      modal.style.bottom = "auto";
    } else {
      modal.classList.remove("open");
    }
  }

  showTyping(container) {
    const typing = document.createElement("div");
    typing.classList.add("typing");
    typing.id = "typingIndicator";

    typing.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
  }

  removeTyping() {
    const typing = this.shadowRoot.getElementById("typingIndicator");
    if (typing) typing.remove();
  }

  formatResponse(text) {
    if (text === null || text === undefined) {
      return { isJson: false, content: "" };
    }

    if (typeof text === "object") {
      return {
        isJson: true,
        content: JSON.stringify(text, null, 2),
      };
    }

    if (typeof text === "string") {
      try {
        const parsed = JSON.parse(text);
        return {
          isJson: true,
          content: JSON.stringify(parsed, null, 2),
        };
      } catch {
        return {
          isJson: false,
          content: text.replace(/^"(.*)"$/, "$1").replace(/\\"/g, '"'),
        };
      }
    }

    return { isJson: false, content: String(text) };
  }

  addMessage(container, text, type) {
    const message = document.createElement("div");
    message.classList.add("message", type);

    const formatted = this.formatResponse(text);

    if (formatted.isJson) {
      const pre = document.createElement("pre");
      pre.textContent = formatted.content;
      message.appendChild(pre);
    } else {
      message.textContent = formatted.content;
    }

    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
  }

  set data(value) {
    this._data = value;
    this.uploadFiles();
  }

  async uploadFiles() {
    this.floatingBtn.disabled = true;
    const formData = new FormData();

    if (!this._data) return;

    formData.append(
      "file1",
      new Blob([JSON.stringify(this._data.file1)], {
        type: "application/json",
      }),
      "file1.json",
    );

    formData.append(
      "file2",
      new Blob([JSON.stringify(this._data.file2)], {
        type: "application/json",
      }),
      "file2.json",
    );

    formData.append("dataset_id", this.datasetId);

    const response = await fetch(
      `${this.apiUrl}/api-agent/analysis/upload-jsons`,
      {
        method: "POST",
        headers: {
          "x-api-key": this.apiKey,
        },
        body: formData,
      },
    ).then((res) => res.json());

    this.floatingBtn.disabled = false;

    // this.floatingBtn.disabled = true;
    // const body = {
    //   dataset_id: this.datasetId,
    //   schema_file: JSON.stringify(this.schemaFile).replaceAll('"', '\\"'),
    //   data_file: this.dataFile,
    // };
    // console.log("BODY COMPONENTE: " + JSON.stringify(body));

    // try {
    //   const response = await fetch(`${this.apiUrl}/api-agent/analysis/upload`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       "x-api-key": this.apiKey,
    //     },
    //     body: formData,
    //   });
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   this.floatingBtn.disabled = false;
    // }
  }

  async sendQuestion() {
    try {
      const input = this.shadowRoot.getElementById("jsonInput");
      const chat = this.shadowRoot.getElementById("chatContainer");

      const question = input.value.trim();
      if (!question) return;

      this.addMessage(chat, question, "user");
      input.value = "";

      this.showTyping(chat);

      const params = new URLSearchParams({
        dataset_id: this.datasetId,
        question: question,
      });

      const response = await fetch(
        `${this.apiUrl}/api-agent/analysis/ask?${params}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this.apiKey,
          },
        },
      );

      const result = await response.json();
      const data = result["data"];
      this.removeTyping();

      this.addMessage(chat, data["answer"], "bot");
    } catch (error) {
      this.removeTyping();
      console.error("Erro:", error);
    }
  }
}

customElements.define("selbetti-agent", SelbettiAgent);
export default SelbettiAgent;
