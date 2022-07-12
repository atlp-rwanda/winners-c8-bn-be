import {BookingService} from "../services/bookingServices";
import FlutterwaveCheckout from "flutterwave-node-v3";
import { pay } from "../utils/flutterwavePayment";
import 'dotenv/config';
import axios from "axios";

class BookingRoomControllers{

    static bookARoom = async (req, res)=>{
        const {roomId} = req.params;
        const {tripId, from, to} = req.body;
        // check room existance
        const room = await BookingService.roomExist(roomId);
        if(room){
            //check room availability
            const roomAvailable = BookingService.checkRoomAvailability(room);
            
            if(roomAvailable){
                // check if trip is approved
                const trip = await BookingService.tripApproved(req.user, tripId)
                if(trip){
                    const booked = await BookingService.bookRoom(room, req.user, from, to);
                    if(booked){
                        room.isBooked = true;
                        room.save();
                        return res.status(201).json({status:201,success:true, booked, message:'Room booked successfully!'});
                    }
                    return res.status(400).json({status:400, success:false, message:'take care on dates'});
                }
                return res.status(403).json({status:403, success:false, message:'Trip need to be approved!'});
            }
            return res.status(400).json({status:400, success:false, message:'Room has been already booked!'});
        }
        return res.status(404).json({status:404, messae:'room does not exist!'});

    }

    static payRoom = async (req, res)=>{
      const data = {
        tx_ref: "hooli-tx-1920bbtytty",
        amount: "100",
        currency: "NGN",
        redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
        meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a"
        },
        customer: {
            email: "user@gmail.com",
            phonenumber: "080****4528",
            name: "Yemi Desola"
        },
        customizations: {
            title: "Pied Piper Payments",
            logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
        }
    }
    axios.post("https://api.flutterwave.com/v3/payments", {
      headers:{
        'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`
      }
      
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
      try {
        const link = axios.post()
        method:'POST',
        
        body: JSON.stringify(data)
      }).then((res)=>res.json())
      .then(data => console.log(data))
      .catch(err){
        console.log(err)
      }
    }   
      
   
  //   try {
  //     const response = await got.post("https://api.flutterwave.com/v3/payments", {
  //         headers: {
  //             Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
  //         },
  //         json: {
  //             tx_ref: "hooli-tx-1920bbtytty",
  //             amount: "100",
  //             currency: "NGN",
  //             redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
  //             meta: {
  //                 consumer_id: 23,
  //                 consumer_mac: "92a3-912ba-1192a"
  //             },
  //             customer: {
  //                 email: "user@gmail.com",
  //                 phonenumber: "080****4528",
  //                 name: "Yemi Desola"
  //             },
  //             customizations: {
  //                 title: "Pied Piper Payments",
  //                 logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
  //             }
  //         }
  //     }).json();
  // } catch (err) {
  //     console.log('errors', err.code);
  //     // console.log(err.response.body);
  // }
  
      // function makePayment() {
      //   FlutterwaveCheckout({
      //     public_key: "FLWPUBK_TEST-2389896803b508a4bf906f86c5eaf113-X",
      //     public_secret:"FLWSECK_TEST-2087a3c42564b43e646219d7e37a90b2-X",
      //     tx_ref: "hooli-tx-1920bbtyt",
      //     amount: 1000,
      //     currency: "NGN",
      //     country: "NG",
      //     payment_options: "card",

      //     // specified redirect URL
      //     redirect_url: "http://localhost:4001/response",

      //     // use customer details if user is not logged in, else add user_id to the request
      //     customer: {
      //       email: "demomail@gmail.com",
      //       phone_number: "08088098622",
      //       name: "Idris Olubisi",
      //     },
      //     callback: function (data) {
      //       console.log(data);
      //     },
      //     onclose: function () {
      //       // close modal
      //     },
      //     customizations: {
      //       title: "Flutterwave Demo",
      //       description: "Flutterwave Payment Demo",
      //       logo: "https://cdn.iconscout.com/icon/premium/png-256-thumb/payment-2193968-1855546.png",
      //     },
      //   });
        
      // }

      // makePayment();

    }
}

export {BookingRoomControllers}