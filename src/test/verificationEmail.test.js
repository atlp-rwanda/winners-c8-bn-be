import assert from 'assert';
import sendVerificationEmail from "../helpers/sendVerificationEmail";
import 'dotenv/config';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { User } from '../database/models';
import { signup } from './mocks/Users';

chai.use(chaiHttp);

let authTokenTest = "";
describe('send verification email - testing', ()=>{

    it('should successfully send the email', function(done){
        this.timeout(5000);
        sendVerificationEmail('geekyrw@gmail.com')
        .then(function(output){
            assert.strictEqual(output.response,"Email sent");
            done();
        })
    });
    it('should fail (no user email address provided)', function(done){
        this.timeout(5000);
        sendVerificationEmail()
        .then(function(output){
            assert(output.hasOwnProperty('error'));
            done();
        })
    });
    it('it should send email on a successful registration', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(signup);
		expect(res.status).to.be.equal(201);
        authTokenTest = res.body.data;
		expect(res.body).to.have.property(
			'message',
			'User registered successfully',
		);
	});
    it('it should verify user in the database', async () => {
		const res = await chai
			.request(app)
			.get('/api/auth/register/verifyuser/'+authTokenTest)
			.send();
        
		expect(res.status).to.be.equal(201);
		expect(res.body).to.have.property(
			'message',
			'User verified successfully',
		);
	});
    it('it can not verify non-existing user', async () => {
		await User.destroy({ where: {} });
		const res = await chai
			.request(app)
			.get('/api/auth/register/verifyuser/'+authTokenTest)
			.send();
        
		expect(res.status).to.be.equal(409);
		expect(res.body).to.have.property(
			'message',
			'Ooops! User does not exist!',
		);
	});
    it('it can not verify with invalid token', async () => {
		const res = await chai
			.request(app)
			.get('/api/auth/register/verifyuser/'+'122ffee')
			.send();
        
		expect(res.status).to.be.equal(400);
		expect(res.body).to.have.property(
			'message',
			'Invalid or expired Token.',
		);
	});
});
