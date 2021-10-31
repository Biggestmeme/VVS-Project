import { Server } from '../server';

beforeAll(() => {
    let server : Server = Server.getInstance();
})

describe("Testing Server Methods", () => {

    test('Server Init State is 0', () => {
        expect(Server.getServerState()).toBe(0);
    });

    test('Server Change state to 1', () => {
        Server.changeServervState(1);
        expect(Server.getServerState()).toBe(1);
    });

    test('Server Init Port is 64501', () => {
        expect(Server.getPortApp()).toBe(64501);
    });

    test('Server Change Port To 65401', () => {
        Server.changeAppPort(65401);
        expect(Server.getPortApp()).toBe(65401);
    });

    test('Server addUser', () => {
        Server.addUser("testUser");
        expect(Server.hasUser("testUser")).toBe(true);
    });





  
})