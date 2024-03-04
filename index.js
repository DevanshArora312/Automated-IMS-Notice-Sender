"use strict";
const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json())
app.use(cors());
app.get("/callApi",async (req,res) => {
    try{
      console.log("here")
      let config = {
        method: 'get',
        url: process.env.LIVE_URL+"/check-and-send",
    };
      const response = await axios(config);
      return res.status(response.status).json({success:response.success});
    } catch(err){
      return res.status(400).json({success : false,message : err.message});
    }
})

app.get("/",async (req,res)=>{
    res.status(200).send("working!");
})

app.listen(process.env.PORT || 1557, async () => {
    console.log(`cron job running`);
});


