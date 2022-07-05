import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { User } from '../database/models';
import {signup,update_user} from './mocks/Users';

chai.use(chaiHttp);

describe('Testing  User Profile endpoint', () => {
	before(async () => {
		await User.destroy({ where: {} });
	});
	it('it should update user Profile', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(signup);
       const token=`Bearer ${res.body.data}`
       const update=await chai.request(app)
       .patch('/api/user/update')
       .send(update_user)
       .set('Authorization', token)
		expect(update.status).to.be.equal(200);
		expect(update.body).to.have.property(
			'message',
			'user Profile updated well done',
		);
	});
	it('it should return 400 for empty fildes', async () => {
        await User.destroy({ where: {} });
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(signup);
       const token=`Bearer ${res.body.data}`
       const update=await chai.request(app)
       .patch('/api/user/update')
       .send()
       .set('Authorization', token)
		expect(update.status).to.be.equal(400);
	});
	it('it should Unauthorization', async () => {
       const update=await chai.request(app)
       .patch('/api/user/update')
       .send()
		expect(update.status).to.be.equal(401);
		expect(update.body).to.have.property(
			'message',
			'Not authorized, no token',
		);
	});
	
	after(async () => {
		await User.destroy({ where: {} });
	});
});

