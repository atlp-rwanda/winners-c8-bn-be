import chai,{expect} from 'chai';
import ChaiHttp from 'chai-http';
import {Sequelize} from 'sequelize';
import 'dotenv/config';
import server from '../index';
import DB from '../database';
chai.use(ChaiHttp);

describe('Database connection', ()=>{
    
    it('test if testfoot database is connected', (done)=>{
        expect(DB.config).to.have.property("database");
        expect(DB.config).to.have.property("username");
        expect(DB.config.database).to.equal(process.env.TEST_DB_NAME);
        expect(DB.config.username).to.equal(process.env.TEST_DB_USERNAME);
        done();
    })
})