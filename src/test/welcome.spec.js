import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();

chai.use(chaiHttp);

describe('TEST Barefoot APIs', () => {

  it('should GET Welcome Text', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        done();
      });
  });

  it('should GET Bad requests', (done) => {
    chai.request(app)
      .get('/*')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        done();
      });
  });
});
