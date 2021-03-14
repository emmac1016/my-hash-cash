import supertest from 'supertest';
import app from './app';

describe('POST /find', () => {
  test('It should respond with json that contains proof of work value', (done) => {
    supertest(app)
      .post('/find')
      .send({ c: 'iBeat', n: 16 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          w: 62073,
          match: 'iBeat62073',
          hash:
            '0000d4ab4f89e8d1cd021a04151a280e4c76d487e04074a232bb0a8dec4a74cf',
        },
        done
      );
  });

  test('It should respond with 400 if missing expected POST body', (done) => {
    supertest(app)
      .post('/find')
      .send({ someKey: 'someValue' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          errors: [
            { msg: 'must be a string', param: 'c', location: 'body' },
            {
              msg: 'must be an integer that is a multiple of 4',
              param: 'n',
              location: 'body',
            },
          ],
        },
        done
      );
  });
});

describe('POST /verify', () => {
  test('It should respond with json that contains true for correct combo of challenge string, number of bits, and proof of work', (done) => {
    supertest(app)
      .post('/verify')
      .send({ c: 'iBeat', n: 16, w: 62073 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          valid: true,
        },
        done
      );
  });

  test('It should respond with json that contains false for incorrect combo of challenge string, number of bits, and proof of work', (done) => {
    supertest(app)
      .post('/verify')
      .send({ c: 'iBeat', n: 16, w: 2073 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          valid: false,
        },
        done
      );
  });

  test('It should respond with 400 if missing expected POST body', (done) => {
    supertest(app)
      .post('/verify')
      .send({ someKey: 'someValue' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          errors: [
            { msg: 'must be a string', param: 'c', location: 'body' },
            {
              msg: 'must be an integer that is a multiple of 4',
              param: 'n',
              location: 'body',
            },
            { msg: 'must be an integer', param: 'w', location: 'body' },
          ],
        },
        done
      );
  });
});
