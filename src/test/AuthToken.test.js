import chai,{expect} from 'chai';
import AuthToken from '../utils/helpers/AuthToken';
const token = "";
describe("getToken(token)", ()=>{
    const data = { email:"alain@gmail.com", password: "12345"}
    it('it should return data', ()=>{
     expect(AuthToken.TokenGenerator(data)).to.have.status(200),
     expect(AuthToken.TokenGenerator(data)).to.have.property('token'),
     token = AuthToken.TokenGenerator(data)
    })
    it("it should return data", ()=>{
        expect(AuthToken.decodeToken(token)).to.have.property('data')
    })
});