require("dotenv").config();
const mongoose = require("mongoose");

const lastNoticeSchema = new mongoose.Schema(
    {
        iid : {
            type : String,
            default : 1
        },
        one : {
            type : String,
            required : true
        },
        two : {
            type : String,
            required : true
        }
        
    }
);

const lastNoticeModel = mongoose.model("lastNotice" , lastNoticeSchema);

const dbConnect = () =>{
    mongoose.connect(process.env.DB_URL,{
        useNewurlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("connected Succesfully ");
    }).catch((error) => {
        console.log("Recieved an error" ,error );
    })
}

module.exports = {dbConnect,lastNoticeModel};