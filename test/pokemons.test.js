const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:1337';
const user = { name: 'johndoe', password: '123456' };

describe('Pokemons API', () => {
  let token;

  before(done => {
    chai
      .request(url)
      .post('/api/auth')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('GET /pokemons', () => {
    it('should get pokemons', done => {
      chai
        .request(url)
        .get('/api/pokemons')
        .set('Authorization', `Bearer ${token}`)
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body).length.to.not.equal(0);
          done();
        });
    });
  });
});
