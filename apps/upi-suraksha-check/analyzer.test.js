import test from "node:test";
import assert from "node:assert/strict";
import {analyzeMessage,ruleCount} from "./analyzer.js";

test("empty input returns empty state",()=>assert.equal(analyzeMessage("  ").level,"empty"));
test("PIN requested to receive payment is high risk",()=>assert.equal(analyzeMessage("To receive money, enter your UPI PIN and approve collect request").level,"high"));
test("OTP plus fake KYC link is high risk",()=>assert.equal(analyzeMessage("Your KYC will be blocked today. Click https://fake.example and share OTP").level,"high"));
test("remote access APK is detected",()=>assert.ok(analyzeMessage("Install AnyDesk APK for refund").signals.some(s=>s.id==="apk")));
test("QR refund claim is detected",()=>assert.ok(analyzeMessage("Scan this QR code to receive your refund").signals.some(s=>s.id==="qr")));
test("benign text is not assigned high risk",()=>assert.notEqual(analyzeMessage("Your order has been delivered. Thank you.").level,"high"));
test("score is capped at 100",()=>assert.ok(analyzeMessage("OTP PIN KYC update urgent https://bad.example install AnyDesk QR refund police").score<=100));
test("ruleset contains multiple independent checks",()=>assert.ok(ruleCount>=8));