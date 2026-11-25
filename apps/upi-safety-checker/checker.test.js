import test from "node:test";
import assert from "node:assert/strict";
import { analyzeMessage } from "./checker.js";

test("empty input asks user to paste a message", () => {
  assert.equal(analyzeMessage(" ").level, "empty");
});

test("UPI PIN and OTP requests are high risk", () => {
  const result = analyzeMessage("Share your UPI PIN and OTP now");
  assert.equal(result.level, "high");
  assert.ok(result.signals.length >= 2);
});

test("shortened links add a warning", () => {
  const result = analyzeMessage("Open https://bit.ly/example to claim your reward");
  assert.ok(result.signals.some(signal => signal.includes("Shortened URL")));
});

test("ordinary neutral text is not marked high risk", () => {
  const result = analyzeMessage("Meeting is at 5 PM tomorrow");
  assert.notEqual(result.level, "high");
});

test("QR payment language gives a safety reminder", () => {
  const result = analyzeMessage("Scan this QR code to receive money");
  assert.ok(result.advice.some(item => item.includes("QR scan")));
});