const RULES = [
  { id: "pin", pattern: /\b(?:upi\s*pin|pin|atm\s*pin)\b/i, label: "Message mein UPI/PIN ka zikr hai.", advice: "Apna UPI PIN kisi ko na batayein aur unknown request par PIN enter na karein." },
  { id: "otp", pattern: /\botp\b|one[ -]?time password/i, label: "Message OTP maangne ya share karne ka signal deta hai.", advice: "OTP kisi ke saath share na karein." },
  { id: "remote", pattern: /screen[ -]?share|anydesk|teamviewer|remote[ -]?access|quick.?support/i, label: "Screen-sharing ya remote-access app ka zikr hai.", advice: "Unknown person ke kehne par screen share ya remote-access app install na karein." },
  { id: "urgent", pattern: /account.{0,30}(block|suspend| बंद)|(?:within|in)\s*(?:\d+|one|two|24)\s*(?:hours?|hrs?)/i, label: "Urgent account-blocking ya deadline ka pressure ho sakta hai.", advice: "Message ke link par click na karein; bank ki official app/website se status check karein." },
  { id: "refund", pattern: /refund|cashback|prize|lottery|reward|कॅशबैक|इनाम/i, label: "Refund, cashback, prize ya reward ka lure hai.", advice: "Paise receive karne ke liye UPI PIN enter karna ya collect request approve karna zaroori nahi hota." },
  { id: "apk", pattern: /\.apk\b|install.{0,25}(app|application)|download.{0,25}app/i, label: "App/APK install karne ko kaha ja raha hai.", advice: "Unknown APK install na karein; sirf official app store ka use karein." },
  { id: "collect", pattern: /collect request|approve.{0,20}(request|payment)|pay.{0,20}to receive/i, label: "Payment/collect request approve karne ko kaha ja raha hai.", advice: "Collect request ko dhyan se padhein. Unknown request approve karne se aapke account se paise ja sakte hain." }
];

const SHORTENERS = new Set(["bit.ly", "tinyurl.com", "t.co", "goo.gl", "cutt.ly", "rb.gy", "is.gd", "ow.ly"]);

export function analyzeMessage(input) {
  const text = String(input ?? "").trim();
  if (!text) return { level: "empty", score: 0, signals: [], advice: ["Pehle message ya link paste karein."] };

  const signals = [];
  const advice = [];
  let score = 0;

  for (const rule of RULES) {
    if (rule.pattern.test(text)) {
      signals.push(rule.label);
      advice.push(rule.advice);
      score += rule.id === "pin" || rule.id === "otp" || rule.id === "remote" ? 3 : 2;
    }
  }

  const urls = text.match(/https?:\/\/[^\s<>"']+/gi) ?? [];
  for (const rawUrl of urls) {
    try {
      const url = new URL(rawUrl.replace(/[),.!?]+$/, ""));
      const host = url.hostname.toLowerCase();
      if (SHORTENERS.has(host)) {
        signals.push("Shortened URL mila; asli destination chhupa ho sakta hai.");
        advice.push("Short link open na karein. Sender se official website ka direct address maangein.");
        score += 2;
      }
      if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) {
        signals.push("Link domain ki jagah direct IP address use karta hai.");
        advice.push("Unknown IP-address link open na karein.");
        score += 2;
      }
      if (host.startsWith("xn--") || host.split(".").some(part => part.startsWith("xn--"))) {
        signals.push("Link mein internationalized/punycode domain hai; spelling carefully verify karein.");
        advice.push("Domain ko independently verify kiye bina login ya payment details na dein.");
        score += 1;
      }
    } catch {
      signals.push("Ek URL ka format unusual ya invalid hai.");
      advice.push("Link par click karne ke bajay official app/website manually open karein.");
      score += 1;
    }
  }

  if (/qr\s*code|scan.{0,15}qr|क्यूआर/i.test(text)) {
    signals.push("QR code scan karne ko kaha gaya hai.");
    advice.push("Paise receive karne ke liye QR scan karke UPI PIN dalne ki zaroorat nahi hoti.");
    score += 1;
  }

  const uniqueSignals = [...new Set(signals)];
  const uniqueAdvice = [...new Set(advice)];
  const level = score >= 5 ? "high" : score >= 2 ? "medium" : "low";
  if (!uniqueSignals.length) {
    uniqueAdvice.push("Sender, number aur website ko independently verify karein. Unknown links par login ya payment details na dein.");
  }
  return { level, score, signals: uniqueSignals, advice: uniqueAdvice };
}