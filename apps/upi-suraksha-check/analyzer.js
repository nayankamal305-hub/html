const patterns = [
  {id:"pin_receive", re:/\b(?:receive|get|claim|collect)\b.{0,55}\b(?:money|payment|refund|cash)\b.{0,45}\b(?:pin|upi pin|approve|accept)\b|\bपैसे\s*(?:पाने|मिलने|receive).{0,45}(?:पिन|pin|approve)/i, points:38, hi:"पैसे पाने के लिए PIN / approval माँगा जा रहा है", en:"It asks for a PIN or approval to receive money."},
  {id:"otp", re:/\b(?:share|send|tell|verify|enter)\b.{0,35}\botp\b|\botp\b.{0,35}\b(?:share|send|call|whatsapp)\b|ओटीपी|otp साझा/i, points:30, hi:"OTP साझा करने या बताने का संकेत", en:"It asks you to share or reveal an OTP."},
  {id:"pin", re:/\b(?:share|send|tell|enter|confirm)\b.{0,35}\b(?:upi\s*)?pin\b|\bpin\b.{0,30}\b(?:share|send|tell)\b|यूपीआई पिन बताएं|पिन साझा/i, points:35, hi:"UPI PIN साझा / दर्ज करने का संदिग्ध निर्देश", en:"It asks for a UPI PIN or tells you to share it."},
  {id:"urgency", re:/\b(?:urgent|immediately|within\s*\d+\s*(?:min|hour)|last warning|blocked today|suspended)\b|तुरंत|अभी नहीं तो|आज ही बंद|जल्दी करें|अकाउंट बंद/i, points:15, hi:"जल्दबाज़ी या अकाउंट बंद होने का दबाव", en:"Urgency or an account-block threat is used."},
  {id:"kyc", re:/\b(?:kyc|pan|aadhaar|account)\b.{0,45}\b(?:update|verify|block|suspend|expire)\b|\b(?:update|verify)\b.{0,35}\b(?:kyc|pan|aadhaar)\b|केवाईसी|k y c/i, points:22, hi:"KYC / अकाउंट वेरिफिकेशन का दावा", en:"It makes a KYC or account-verification claim."},
  {id:"link", re:/https?:\/\/|www\.|\b[a-z0-9-]+\.(?:in|com|net|org|co|xyz|top|site|click)\b/i, points:18, hi:"मैसेज में बाहरी लिंक / डोमेन है", en:"The message contains an external link or domain."},
  {id:"apk", re:/\b(?:apk|install|download)\b.{0,55}\b(?:app|application|file)\b|\b(?:anydesk|teamviewer|quick.?support|rustdesk|screen.?share)\b|एपीके|ऐप डाउनलोड/i, points:35, hi:"APK / remote-access ऐप का संकेत", en:"It mentions an APK or remote-access app."},
  {id:"refund", re:/\b(?:refund|cashback|prize|lottery|reward|bonus)\b.{0,65}\b(?:claim|scan|click|pay|fee|pin|qr)\b|रिफंड|इनाम|लॉटरी|कैशबैक/i, points:20, hi:"रिफंड / इनाम के बहाने कार्रवाई करवाना", en:"A refund, prize or reward is used to trigger action."},
  {id:"qr", re:/\b(?:scan|scanning)\b.{0,35}\bqr\b|\bqr\b.{0,40}\b(?:receive|get|refund|claim)\b|क्यूआर|qr कोड/i, points:22, hi:"QR स्कैन करके पैसे पाने का दावा", en:"It suggests scanning a QR code to receive money."},
  {id:"threat", re:/\b(?:police|arrest|legal action|fine|penalty|digital arrest)\b|पुलिस|गिरफ्तार|जुर्माना|डिजिटल अरेस्ट/i, points:18, hi:"धमकी / कानूनी कार्रवाई का डर", en:"Threats or legal-action pressure appear."}
];

export function analyzeMessage(input) {
  const text = String(input ?? "").trim();
  if (!text) return {score:0,level:"empty",signals:[],advice:[]};
  const signals = patterns.filter(p => p.re.test(text));
  let score = Math.min(100, signals.reduce((sum,p)=>sum+p.points,0));
  const level = score >= 55 ? "high" : score >= 25 ? "medium" : "low";
  const advice = level === "high"
    ? ["इस मैसेज पर भरोसा करके भुगतान या approval न करें।","लिंक न खोलें, OTP / UPI PIN साझा न करें और अनजान ऐप install न करें।","अपने बैंक के आधिकारिक ऐप / कार्ड पर दिए नंबर से स्वतंत्र रूप से पुष्टि करें।"]
    : level === "medium"
    ? ["भेजने वाले की पहचान अलग आधिकारिक माध्यम से जाँचें।","लिंक, payment request और beneficiary का नाम ध्यान से verify करें।","कोई PIN / OTP साझा न करें; दबाव में भुगतान न करें।"]
    : ["यहाँ कोई स्पष्ट ज्ञात red-flag pattern नहीं मिला। इसका अर्थ यह नहीं कि संदेश सुरक्षित है।","भुगतान से पहले UPI ऐप में प्राप्तकर्ता का नाम और रकम जाँचें।","संदेह हो तो बैंक के आधिकारिक चैनल से पुष्टि करें।"];
  return {score,level,signals:signals.map(p=>({id:p.id,hi:p.hi,en:p.en})),advice};
}
export const ruleCount = patterns.length;
