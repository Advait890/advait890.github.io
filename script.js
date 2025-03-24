
const terminal = document.getElementById("terminal");

const script = [

  { type: "command", text: "login: advait" },
  { type: "command", text: "password: ********" },
  { type: "output", text: "Authentication successful. Access granted." },
  { type: "spacer" },

  { type: "command", text: "sudo cat /usr/bin/profile.sh" },
  { type: "output", text: "#!/bin/bash" },
  { type: "output", text: "echo 'Loading profile...'" },
  { type: "spacer" },

  { type: "output", text: "Initiated in the trenches of VAPT — testing systems, breaking into apps, and reporting flaws." },
  { type: "spacer" },
  { type: "output", text: "Studied bsc-it." },
  { type: "output", text: "Now operating at breaking all security vulnerabilities" },
  { type: "spacer" },
  { type: "output", text: "Expert in breaking into webapp, mobile app, API and Network." },
  { type: "spacer" },
  { type: "output", text: "Call me when you want to break into the system." },
  { type: "spacer" },

  { type: "command", text: "echo $CONTACT" },
  { type: "output", text: "Email: <a href='advaitkhatu@gmail.com'>advaitkhatu@gmail.com</a>" },
  { type: "spacer" },

  { type: "command", text: "shutdown -h now" },
  { type: "output", text: "Session terminated. See you in the matrix !!!" }
];

let lineIndex = 0;
let charIndex = 0;
let currentLine = null;
let fullTextRaw = "";
let fullTextHtml = "";

function typeNextChar() {
  if (lineIndex >= script.length) {
    const cursor = document.querySelector(".cursor");
    if (cursor) cursor.remove();
    return;
  }

  const entry = script[lineIndex];

  if (entry.type === "spacer") {
    const spacer = document.createElement("div");
    spacer.classList.add("line");
    spacer.innerHTML = " ";
    terminal.appendChild(spacer);
    lineIndex++;
    setTimeout(typeNextChar, 150);
    return;
  }

  if (!currentLine) {
    currentLine = document.createElement("div");
    currentLine.classList.add("line");
    terminal.appendChild(currentLine);

    if (entry.type === "command") {
      fullTextHtml = '<span class="prompt">advaith@localhost:~$</span> ' + entry.text;
      fullTextRaw = stripHtml('<span class="prompt">advait@localhost:~$</span> ') + entry.text;
    } else {
      fullTextHtml = entry.text;
      fullTextRaw = stripHtml(entry.text);
    }
  }

  if (charIndex < fullTextRaw.length) {
    let displayed = escapeHtml(fullTextRaw.slice(0, charIndex + 1));
    if (entry.type === "command") {
      displayed = '<span class="prompt">advait@localhost:~$</span> ' + escapeHtml(fullTextRaw.slice(stripHtml('<span class="prompt">advait@localhost:~$</span> ').length, charIndex + 1));
    }
    currentLine.innerHTML = displayed + '<span class="cursor"></span>';
    charIndex++;
    setTimeout(typeNextChar, 35);
  } else {
    currentLine.innerHTML = fullTextHtml;
    currentLine = null;
    charIndex = 0;
    lineIndex++;
    setTimeout(typeNextChar, 300);
  }
}

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

typeNextChar();
