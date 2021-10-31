import {serverListener} from '../../index';
import * as request from 'supertest';

describe('loading express', function () {
    let server : any;
    beforeAll(function () {
      server = serverListener;
    });
    afterAll(function () {
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
    it('responds to /addUser?user=bogdan', function testPath(done) {
        request.default(server)
          .post('/addUser?user=bogdan')
          .expect(200, done);
      });
    it('responds to already added user /addUser?user=bogdan', function testPath(done) {
    request.default(server)
        .post('/addUser?user=bogdan')
        .expect(400, done);
    });
    it('responds to /addUser?user=%3ebogdan%3f', function testPath(done) {
        request.default(server)
            .post('/addUser?user=%3ebogdan%3f')
            .expect(400, done);
    });
    it('responds to /addUser?user=<script>alert(1)</script', function testPath(done) {
        request.default(server)
            .post('/addUser?user=<script>alert(1)</script')
            .expect(400, done);
    });
  });