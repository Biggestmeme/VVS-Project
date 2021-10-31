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
const index_1 = require("../../index");
const request = __importStar(require("supertest"));
describe('loading express', function () {
    let server;
    beforeEach(function () {
        server = index_1.serverListener;
    });
    afterEach(function () {
        server.close();
    });
    it('responds to /', function testSlash(done) {
        request.default(server)
            .get('/')
            .expect(404, done);
    });
    it('404 everything else', function testPath(done) {
        request.default(server)
            .get('/foo/bar')
            .expect(404, done);
    });
    it('responds to /addUser', function testPath(done) {
        request.default(server)
            .post('/addUser?user=bogdan')
            .expect(200, done);
    });
});
