"use strict";

const express = require("express");
const axios = require("axios").default;
const app = express();
const cron = require("node-cron");
require("dotenv").config();
const token = process.env.WHATSAPP_TOKEN;
const send = require("./sendMessage");
const checkPdfs = require("./checkPdfs");
const fs = require("fs");
const cors = require("cors");

app.use(cors());
app.get("/check-and-send",async (req,res) => {
    try{
      console.log("here")
      const finalData = await checkPdfs();
      console.log(finalData)
      for(let i=0;i<finalData.length;i++){
        await send(finalData[i]);
      }
      return res.status(200).json({success:true});
    } catch(err){
      return res.status(400).json({success : false,message : err.message});
    }
})

app.listen(process.env.PORT || 1337, async () => {
    console.log(`webhook running` );
    
    // cron.schedule('0 * * * *', async () => {
      
    // }, {
    //   scheduled: true,
    //   timezone: "Asia/Kolkata"
    // });
    
});
app.use(express.json())



app.post("/webhook", (req, res) => {
  
  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body));

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body) {
    if(
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
        let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
        let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
        axios({
            method: "POST", 
            url:
            "https://graph.facebook.com/v12.0/" +
            phone_number_id +
            "/messages?access_token=" +
            token,
            data: {
            messaging_product: "whatsapp",
            to: from,
            text: { body: "Please do not send messages to this bot. This is an automated service unable to read and reply to messages" },
            },
            headers: { "Content-Type": "application/json" , "Authorization" : `Bearer ${token}` },
        });
    }
    return res.status(200).send("ok");
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    return res.status(404).send("NOT found")
  }
});

app.get("/webhook", (req, res) => {
  const verify_token = process.env.VERIFY_TOKEN;

  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === verify_token) {
        console.log("WEBHOOK_VERIFIED");
        return res.status(200).send(challenge);
    } else {
        return res.sendStatus(403);
    }
  }
});
