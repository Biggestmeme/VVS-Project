"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
beforeAll(() => {
    let server = server_1.Server.getInstance(64501, 0);
});
describe("Testing Server Methods", () => {
    test('Server Init State is 0', () => {
        expect(server_1.Server.getServerState()).toBe(0);
    });
    test('Server Change state to 1', () => {
        server_1.Server.changeServervState(1);
        expect(server_1.Server.getServerState()).toBe(1);
    });
    test('Server Init Port is 64501', () => {
        expect(server_1.Server.getPortApp()).toBe(64501);
    });
    test('Server Change Port To 65401', () => {
        server_1.Server.changeAppPort(65401);
        expect(server_1.Server.getPortApp()).toBe(65401);
    });
    test('Server addUser', () => {
        server_1.Server.addUser("testUser");
        expect(server_1.Server.hasUser("testUser")).toBe(true);
    });
});
