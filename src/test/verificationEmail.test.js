import assert from 'assert';
import sendVerificationEmail from "../helpers/sendVerificationEmail"
import 'dotenv/config';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY___EMAIL_VERIFICATION;

describe('send verification email - testing', ()=>{

    it('should successfully send the email', function(done){
        this.timeout(5000);
        sendVerificationEmail('mbonimpa_218000124@stud.ur.ac.rw')
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
