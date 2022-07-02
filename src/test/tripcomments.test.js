import chai, { expect } from 'chai';
import request from 'supertest';
import models from '../database/models';
import app from '../index';
import Protection from '../middlewares/hash';
import { signup, commentor, unknown } from './mocks/Users';
import { ownedTrip } from './mocks/TripRequests';
import { realAccomodation } from './mocks/accomodation';
const { hashPassword, verifyToken } = Protection;

const { User, TripRequest, Accommodation } = { ...models };
let userId;
let commentId;

describe('TESTING COMMENTS API', async () => {
	let url = `/api/comments/`;

	const adminMock = { ...signup };
	const user = {
		token: null,
	};
	const admin = {
		token: null,
	};
	const manager = {
		token: null,
	};
	const dummy = {
		token: null,
	};
	const trips = {
		tripId: null,
	};

	adminMock.user_role = '013dddd7-2769-4de6-8fc3-7aa527114879';
	adminMock.email = 'admin@gmail.com';
	// Create tables in the test databases
	before(async () => {
		try {
			await User.create({
				...adminMock,
				password: hashPassword(signup.password),
				isVerified: true,
			});

			await User.create({
				...commentor,
				password: hashPassword(commentor.password),
				isVerified: true,
			});

			const author = await request(app).post('/api/auth/signin').send({
				email: commentor.email,
				password: commentor.password,
			});
			manager.token = author.body.data;

			await User.create({
				...unknown,
				password: hashPassword(unknown.password),
				isVerified: true,
			});

			const other = await request(app).post('/api/auth/signin').send({
				email: unknown.email,
				password: unknown.password,
			});
			dummy.token = other.body.data;

			const res = await request(app)
				.post('/api/auth/signin')
				.send({ email: adminMock.email, password: signup.password });

			admin.token = res.body.data;
			admin.data = await verifyToken(admin.token);

			await User.create({
				...signup,
				password: hashPassword(signup.password),
				isVerified: true,
			});
			const resUser = await request(app)
				.post('/api/auth/signin')
				.send({ email: signup.email, password: signup.password });

			user.token = resUser.body.data;
			user.data = await verifyToken(user.token);

			const accomodation = await Accommodation.create(realAccomodation);

			const trip = await TripRequest.create(ownedTrip );
			trips.tripId = trip.id;
		} catch (error) {
			console.log({ error });
		}
	});

	after(async () => {
		try {
			await User.destroy({ where: {} });
			await TripRequest.destroy({ where: {} });
			await Accommodation.destroy({ where: {} });
		} catch (error) {
			console.error({ error });
		}
	});
	it('It should check if trip exists', async () => {
		let id = 8;
		const ress = await request(app)
			.get(`/api/trips/${id}/comments`) // user id is not the correct tripId
			.set('Authorization', `Bearer ${user.token}`);
		expect(ress).to.have.property('status', 404);
	});
	it('It should validate trip owner or manager', async () => {

		const requestBody = { comment: 'hello world' };
        const logged = await request(app)
			.post('/api/auth/signin')
			.send({ email: unknown.email, password: unknown.password });

		const res1 = await request(app)
			.post(`/api/trips/${trips.tripId}/comment`)
			.send(requestBody)
			.set('Authorization', `Bearer ${logged.body.data}`);
		expect(res1.status).to.be.equal(403);
	});
	it('It should return 201 when comment is created', async () => {
		const requestBody = {
			comment: 'comment from Requester: testing@gmail.com',
		};
        const logged = await request(app)
			.post('/api/auth/signin')
			.send({ email: commentor.email, password: commentor.password });

		const res1 = await request(app)
			.post(`/api/trips/${trips.tripId}/comment`)
			.set('Authorization', `Bearer ${logged.body.data}`)
			.send(requestBody);
		expect(res1.status).to.be.equal(201);
	});
	it('should return all comments related to that trip', async () => {
		const res = await request(app)
			.get(`/api/trips/${trips.tripId}/comments`)
			.set('Authorization', `Bearer ${manager.token}`);

		expect(res.status).to.be.equal(200);
	});
	it('It should validate if comment exists to be deleted', async () => {
		const ress2 = await request(app)
			.delete(`/api/trips/${trips.tripId}/comments${commentId}`)
			.set('Authorization', `Bearer ${user.token}`);

		expect(ress2).to.have.property('status', 404);
	});
	it('It should delete comment', async () => {
		let commentId = 1
		const ress1 = await request(app)
			.delete(`/api/trips/${trips.tripId}/comments/${commentId}`)
			.set('Authorization', `Bearer ${manager.token}`);
		expect(ress1.status).to.be.equal(200);
	});
	it('It should validate empty inputs', async () => {
		const requestBody = { };
		const ress3 = await request(app)
			.post(`/api/trips/${trips.tripId}/comment`)
			.set('Authorization', `Bearer ${user.token}`)
			.send(requestBody);

		expect(ress3.status).to.be.equal(400);
	});

	it('It should validate empty comment message', async () => {
		const requestBody = {
			comment: '',
		};
		const ress5 = await request(app)
			.post(`/api/trips/${trips.tripId}/comment`)
			.send(requestBody)
			.set('Authorization', `Bearer ${manager.token}`);

		expect(ress5.status).to.be.equal(400);
	});
});
