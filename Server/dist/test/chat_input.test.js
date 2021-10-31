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
const chatVerifiers = __importStar(require("../controllers/chat/chatMessageVerifiers"));
const chatModifiers = __importStar(require("../controllers/chat/chatInputModifier"));
const chat = __importStar(require("../controllers/chat/chat"));
describe("Testing Chat functions", () => {
    describe('Testing stripAfterCommand', () => {
        test('do:w loremipsum is do:w', () => {
            expect(chatModifiers.stripAfterCommand('do:w loremipsum')).toBe('do:w');
        });
        test('do:w is do:w', () => {
            expect(chatModifiers.stripAfterCommand('do:w')).toBe('do:w');
        });
        test('do:wloremipsum is do:wloremipsum', () => {
            expect(chatModifiers.stripAfterCommand('do:wloremipsum')).toBe('do:wloremipsum');
        });
    });
    describe('Testing stripNewLine', () => {
        test('do:w\n is do:w', () => {
            expect(chatModifiers.stripNewLine('do:w\n')).toBe('do:w');
        });
        test('\ndo:w\n is do:w', () => {
            expect(chatModifiers.stripNewLine('\ndo:w\n')).toBe('do:w');
        });
    });
    describe('Testing checkMessageConditions', () => {
        test('hello world is true', () => {
            expect(chatVerifiers.checkMessageConditions('hello world')).toBe(true);
        });
        test('hello world*50 is false', () => {
            expect(chatVerifiers.checkMessageConditions('hello world'.repeat(50))).toBe(false);
        });
        test('<script></script> is false', () => {
            expect(chatVerifiers.checkMessageConditions('<script></script>')).toBe(false);
        });
    });
    describe('Testing isGameCommand', () => {
        test('do:w is true', () => {
            expect(chatVerifiers.isGameCommand('do:w')).toBe(true);
        });
        test('do:wloremipsum is false', () => {
            expect(chatVerifiers.isGameCommand('do:wloremipsum')).toBe(false);
        });
        test('do:w loremipsum is false', () => {
            expect(chatVerifiers.isGameCommand('do:w loremipsum')).toBe(false);
        });
        test('w loremipsum is false', () => {
            expect(chatVerifiers.isGameCommand('w loremipsum')).toBe(false);
        });
        test('loremipsum do:w is false', () => {
            expect(chatVerifiers.isGameCommand('loremipsum do:w')).toBe(false);
        });
    });
    describe('Testing handleReceivedMessages', () => {
        test('do:w loremipsum is do:w loremipsum', () => {
            expect(chat.handleReceivedMessages('do:w loremipsum')).toBe('do:w loremipsum');
        });
        test('do:w is do:w', () => {
            expect(chat.handleReceivedMessages('do:w')).toBe('do:w');
        });
        test('do:wloremipsum is do:wloremipsum', () => {
            expect(chat.handleReceivedMessages('do:wloremipsum')).toBe('do:wloremipsum');
        });
        test('hello world is hello world', () => {
            expect(chat.handleReceivedMessages('hello world')).toBe('hello world');
        });
        test('hello world*50 is null', () => {
            expect(chat.handleReceivedMessages('hello world'.repeat(50))).toBe(null);
        });
        test('<script></script> is null', () => {
            expect(chat.handleReceivedMessages('<script></script>')).toBe(null);
        });
        test('do:wloremipsum is do:wloremipsum', () => {
            expect(chat.handleReceivedMessages('do:wloremipsum')).toBe('do:wloremipsum');
        });
        test('w loremipsum is w loremipsum', () => {
            expect(chat.handleReceivedMessages('w loremipsum')).toBe('w loremipsum');
        });
        test('loremipsum do:w is loremipsum do:w', () => {
            expect(chat.handleReceivedMessages('loremipsum do:w')).toBe('loremipsum do:w');
        });
    });
});
