
const getTitles = require("./getTitles");
var lastNotice = require('./config.json')
const getPdf = require("./getPdf");
const fs = require("fs");

const checkPdfs = async () => {
    const allNotices = await getTitles(lastNotice);
    if(allNotices.notices1.length > 0) lastNotice[0].one = allNotices.notices1[0].title;
    if(allNotices.notices2.length > 0) lastNotice[0].two = allNotices.notices2[0].title; 
    // try{
    //   fs.writeFile("config.json",JSON.stringify(lastNotice),err => { 
    //     if (err) throw err;
    //     console.log("Done writing");
    // })
    // } catch(err){
    //   console.log("got error here")
    // }
    
    if(allNotices.notices1.length > 0){
      for(let i = 0;i<allNotices.notices1.length;i++){
        const pdf = await getPdf(allNotices.notices1[i].link);
        allNotices.notices1[i].pdf = pdf
      }
    }
    if(allNotices.notices2.length > 0){
      for(let i = 0;i<allNotices.notices2.length;i++){
        const pdf = await getPdf(allNotices.notices2[i].link);
        allNotices.notices2[i].pdf = pdf
      }
    }
    
    var finalData = [];
    for(let i=0;i<allNotices.notices1.length;i++){
        finalData.push({
            title : allNotices.notices1[i].title,
            pdf : allNotices.notices1[i].pdf
        })
    }
    for(let i=0;i<allNotices.notices2.length;i++){
        finalData.push({
          title : allNotices.notices2[i].title,
          pdf : allNotices.notices2[i].pdf
        })
    }
    return finalData;
}

module.exports = checkPdfs;