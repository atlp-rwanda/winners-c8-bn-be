import assert from 'assert';
import sendVerificationEmail from "../helpers/sendVerificationEmail"
import 'dotenv/config';


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
});
