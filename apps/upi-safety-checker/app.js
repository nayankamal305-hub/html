import { analyzeMessage } from "./checker.js";

const message = document.querySelector("#message");
const counter = document.querySelector("#counter");
const checkButton = document.querySelector("#check");
const clearButton = document.querySelector("#clear");
const result = document.querySelector("#result");

message.addEventListener("input", () => {
  counter.textContent = `${message.value.length} / 5000`;
});

clearButton.addEventListener("click", () => {
  message.value = "";
  counter.textContent = "0 / 5000";
  result.hidden = true;
  message.focus();
});

checkButton.addEventListener("click", () => {
  const report = analyzeMessage(message.value);
  if (report.level === "empty") {
    message.focus();
    message.setCustomValidity("Pehle message ya link paste karein.");
    message.reportValidity();
    message.setCustomValidity("");
    return;
  }

  const titles = {
    high: ["High risk signs found", "⚠"],
    medium: ["Caution: verify first", "!"],
    low: ["No obvious red flags found", "✓"]
  };
  const summaries = {
    high: "Is message mein multiple strong warning signs hain. Koi payment, PIN, OTP ya app-install action na karein.",
    medium: "Kuch warning signs mile hain. Aage badhne se pehle sender aur request ko official channel se verify karein.",
    low: "Is simple check mein obvious warning signs nahi mile. Phir bhi message ya link ko automatically safe nahi maana ja sakta."
  };

  result.dataset.level = report.level;
  document.querySelector("#risk-title").textContent = titles[report.level][0];
  document.querySelector("#risk-icon").textContent = titles[report.level][1];
  document.querySelector("#risk-summary").textContent = summaries[report.level];

  const signalList = document.querySelector("#signals");
  signalList.replaceChildren();
  if (report.signals.length) {
    for (const signal of report.signals) {
      const item = document.createElement("li");
      item.textContent = signal;
      signalList.append(item);
    }
  } else {
    const item = document.createElement("li");
    item.textContent = "Koi configured warning phrase detect nahi hua.";
    signalList.append(item);
  }

  const adviceList = document.querySelector("#advice");
  adviceList.replaceChildren();
  for (const advice of report.advice) {
    const item = document.createElement("li");
    item.textContent = advice;
    adviceList.append(item);
  }
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});