require("dotenv").config();
const axios = require("axios").default;
const FormData = require("form-data");

const send = async (singleEntry) => {
    let phone_number_id = process.env.PHONE_NUMBER_ID;
    const from = process.env.SEND_TO;
    const token = process.env.WHATSAPP_TOKEN;
    
    if(!Buffer.isBuffer(singleEntry.pdf)){
        try{
            const res = await axios({
                method: "POST", 
                url:
                "https://graph.facebook.com/v12.0/" +
                phone_number_id +
                "/messages?access_token=" +
                token,
                data: {
                    "messaging_product": "whatsapp",
                    "to": from,
                    "recipient_type": "individual",
                    "type": "template",
                    "template": {
                        "name": "new_pdf",
                        "language": {"code": "en"},
                        "components": [
                        {
                            "type": "header",
                            "parameters": [
                                {
                                    "type": "document",
                                    "document": {
                                        "link": singleEntry.pdf,
                                        "filename": "filename"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "body",
                            "parameters": [
                                {
                                    "type": "text",
                                    "text": singleEntry.title
                                }
                            ]
                        }
                    ]
                    
                    }
                    
                },
                headers: { "Content-Type": "application/json" , "Authorization" : `Bearer ${token}` },
            });
            console.log(res.data);

        } catch(err){
            console.log("err aaya: ",err.message)
        }
    }
    else{
        const form = new FormData();
        form.append('file', singleEntry.pdf, {
            filename: `${singleEntry.title}.pdf`,
            contentType: 'application/pdf',
        });
        form.append('type', 'application/pdf');
        form.append('messaging_product', 'whatsapp');
        
        try{
            const resp= await axios({
                method: "POST", 
                url:
                "https://graph.facebook.com/v19.0/" +
                phone_number_id +
                "/media",
                data : form,
                headers: { "Authorization" : `Bearer ${token}`},
            });
            // console.log("resp is :",resp.data)
            const res = await axios({
                method: "POST", 
                url:
                "https://graph.facebook.com/v12.0/" +
                phone_number_id +
                "/messages?access_token=" +
                token,
                data: {
                    "messaging_product": "whatsapp",
                    "to": from,
                    "recipient_type": "individual",
                    "type": "template",
                    "template": {
                        "name": "new_pdf",
                        "language": {"code": "en"},
                        "components": [
                        {
                            "type": "header",
                            "parameters": [
                                {
                                    "type": "document",
                                    "document": {
                                        "id": resp.data.id,
                                        "filename": "filename"
                                    }
                                }
                            ]
                        },
                        {
                            "type": "body",
                            "parameters": [
                                {
                                    "type": "text",
                                    "text": singleEntry.title
                                }
                            ]
                        }
                    ]
                    
                    }
                    
                },
                headers: { "Content-Type": "application/json" , "Authorization" : `Bearer ${token}` },
            });
            console.log(res.data);
        } catch (error){
            console.log("err:",error.message)
        }
    }
    
}

module.exports = send