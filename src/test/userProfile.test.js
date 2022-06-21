// import mocha from 'mocha';
// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../index';
// import { User } from '../database/models';
// import {signup} from './mocks/Users';

// chai.use(chaiHttp);

// describe('Testing  User Profile endpoint', () => {
// 	// before(async () => {
// 	// 	await User.destroy({ where: {} });
// 	// });
// 	it('it should update user Profile', async () => {
// 		const res = await chai
// 			.request(app)
// 			.post('/api/auth/register')
// 			.send(signup);
// 		expect(res.status).to.be.equal(201);
// 		expect(res.body).to.have.property(
// 			'message',
// 			'User registered successfully',
// 		);
//         console.log(res.body)
// 	});
	
// 	after(async () => {
// 		await User.destroy({ where: {} });
// 	});
// });

