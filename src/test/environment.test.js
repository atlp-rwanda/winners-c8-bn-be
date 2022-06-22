import chai,{expect} from 'chai';
import 'dotenv/config';
import getDefault from '../helpers/getEnvironment';



describe("getDefault(value, defaultValue)", ()=>{
    expect(getDefault(undefined, "5000")).to.be.equal("5000"),
    expect(getDefault(undefined, "5000")).to.be.equal("5000"),
    expect(getDefault(2000, "5000")).to.be.equal(2000)
});
