"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const denyIntruder = __importStar(require("../../controllers/denyIntruder"));
describe('Testing denyIntruder functions', () => {
    describe('Testing isInhumanTypingSpeed', () => {
        test('100-50 <= 50 is true', () => {
            expect(denyIntruder.isInhumanTypingSpeed(50, 100, 50)).toBe(true);
        });
        test('500-490 <= 50 is true', () => {
            expect(denyIntruder.isInhumanTypingSpeed(490, 500, 50)).toBe(true);
        });
        test('100-10 <= 50 is false', () => {
            expect(denyIntruder.isInhumanTypingSpeed(10, 100, 50)).toBe(false);
        });
        describe('Testing isInhumanTypingSpeed with real date', () => {
            let date1 = new Date().getTime();
            let date2 = new Date().getTime();
            test('DateNow - DateNow is true', () => {
                expect(denyIntruder.isInhumanTypingSpeed(date2, date1, 50)).toBe(true);
            });
            test('DateNow - (DateNow-100) is false', () => {
                expect(denyIntruder.isInhumanTypingSpeed(date2 - 100, date1, 50)).toBe(false);
            });
        });
    });
});
