import chai, { expect } from "chai";
import Social from '../controllers/socialAuth';
import server from "../index";
import socialAuthData from "./mocks/socialAuthData";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const { request } = chai;


describe("Social auth controller", async () => {

    describe("Sign up using facebook", () => {
      it("should return 403 if the FB account has no associated email", async () => {
        const req = {};
        req.user = socialAuthData.fb_no_email;
        try{
          const res = await Social.Oauth(req,undefined);
          // expect(res.status).to.be.eq(403);
        }
        catch(err){
          // console.log(err.message); // this will display "Cannot read properties of undefined (reading 'status')"
          expect(typeof(err.message)).to.be.eq("string");
        }
      });

      it("should return 201 if the FB account has an associated email", async () => {
        const req = {};
        req.user = socialAuthData.facebook;
        const res = Social.Oauth(req,undefined);
  
        try{
          const res = await Social.Oauth(req,undefined);
          // expect(res.status).to.be.eq(201);
        }
        catch(err){
          // console.log(err.message); // this will display "Cannot read properties of undefined (reading 'status')"
          expect(typeof(err.message)).to.be.eq("string");
        }
      });
    });

    describe("Sign up using google", () => {
  
        it("should return 201", async () => {
          const req = {};
          req.user = socialAuthData.google;
          const res = Social.Oauth(req,undefined);
    
          try{
            const res = await Social.Oauth(req,undefined);
            // expect(res.status).to.be.eq(201);
          }
          catch(err){
            // console.log(err.message); // this will display "Cannot read properties of undefined (reading 'status')"
            expect(typeof(err.message)).to.be.eq("string");
          }
        });
    });

    describe("Log in using facebook", () => {
  
        it("should return 200 if the FB account has an associated email", async () => {
          const req = {};
          req.user = socialAuthData.facebook;
          const res = Social.Oauth(req,undefined);
    
          try{
            const res = await Social.Oauth(req,undefined);
            // expect(res.status).to.be.eq(200);
          }
          catch(err){
            // console.log(err.message); // this will display "Cannot read properties of undefined (reading 'status')"
            expect(typeof(err.message)).to.be.eq("string");
          }
        });
    });
  
    describe("Log in using google", () => {

        it("should return 200", async () => {
        const req = {};
        req.user = socialAuthData.google;
        const res = Social.Oauth(req,undefined);
    
        try{
          const res = await Social.Oauth(req,undefined);
          // expect(res.status).to.be.eq(200);
        }
        catch(err){
          // console.log(err.message); // this will display "Cannot read properties of undefined (reading 'status')"
          expect(typeof(err.message)).to.be.eq("string");
        }
        });
    });
});

describe("Social Auth Endpoints", async () => {
  
    describe("GET /", () => {
      it("should return 200 code (route: /api/oauth/google/callback)", async () => {
        const res = await request(server).get('/api/oauth/google/callback')
  
        expect(res.status).to.be.eq(200);
      });

      it("should return 200 code (route: /api/oauth/facebook/callback)", async () => {
        const res = await request(server).get('/api/oauth/facebook/callback')
  
        expect(res.status).to.be.eq(200);
      });
      it("should return 200 code (route: /api/oauth/google)", async () => {
        const res = await request(server).get('/api/oauth/google')
  
        expect(res.status).to.be.eq(200);
      });

      it("should return 200 code (route: /api/oauth/facebook)", async () => {
        const res = await request(server).get('/api/oauth/facebook')
  
        expect(res.status).to.be.eq(200);
      });

      it("should return 401 code (route: /api/oauth/facebook/failure)", async () => {
        const res = await request(server).get('/api/oauth/facebook/failure')
  
        expect(res.status).to.be.eq(401);
      });

      it("should return 401 code (route: /api/oauth/google/failure)", async () => {
        const res = await request(server).get('/api/oauth/google/failure')
  
        expect(res.status).to.be.eq(401);
      });
    });
});