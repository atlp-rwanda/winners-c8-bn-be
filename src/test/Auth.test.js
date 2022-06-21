import mocha from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { User } from '../database/models';
import {
	signup,
	no_email,
	no_password,
	no_firstname,
	no_lastname,
	invalid_email,
	invalid_password,
} from './mocks/Users';

chai.use(chaiHttp);

describe('Testing  signup error', () => {
	before(async () => {
		await User.destroy({ where: {} });
	});
	it('it should test registration with no firstname', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(no_firstname);
		expect(res.status).to.be.equal(400);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'error',
			'firstName can not be empty',
		);
	});
	it('it should test registration with no lastname', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(no_lastname);
		expect(res.status).to.be.equal(400);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property('error', 'lastName can not be empty');
	});
	it('it should test registration with no email', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(no_email);
		expect(res.status).to.be.equal(400);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'error',
			'email is not allowed to be empty',
		);
	});
	it('it should test registration with no password', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(no_password);
		expect(res.status).to.be.equal(400);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property('error', 'password can not be empty');
	});
	it('it should test registration with invalid email', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(invalid_email);
		expect(res.status).to.be.equal(400);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'error',
			'email must be a valid email',
		);
	});
	it('it should test registration with invalid password', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(invalid_password);
		expect(res.status).to.be.equal(400);
		expect(res.body).to.be.a('object');
		expect(res.body).to.have.property(
			'error',
			'password must contain at least a number, a special character, an upper-case letter and longer than 8 characters',
		);
	});
	after(async () => {
		await User.destroy({ where: {} });
	});
});

describe('Testing  signup endpoints', () => {
	before(async () => {
		await User.destroy({ where: {} });
	});
	it('it should register', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(signup);
	
		expect(res.status).to.be.equal(201);
		expect(res.body).to.have.property(
			'message',
			'User registered successfully',
		);
	});
	it('it should check the user exist', async () => {
		const res = await chai
			.request(app)
			.post('/api/auth/register')
			.send(signup);
		expect(res.status).to.be.equal(409);

		expect(res.body).to.have.property(
			'message',
			'Ooops! User already exists!',
		);
	});
	after(async () => {
		await User.destroy({ where: {} });
	});
});

