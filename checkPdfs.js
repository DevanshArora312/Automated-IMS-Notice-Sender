
const getTitles = require("./getTitles");
var lastNotice = require('./config.json')
const getPdf = require("./getPdf");
const {lastNoticeModel} = require("./database");

const checkPdfs = async () => {
    const lastNotice = await lastNoticeModel.find({iid : '1'});
    // console.log("here2",lastNotice);
    const allNotices = await getTitles(lastNotice[0]);
    try{
      const rep = await lastNoticeModel.findOneAndUpdate({iid : "1"} , {
        one : allNotices.notices1.length > 0 ? allNotices.notices1[0].title : lastNotice[0].one,
        two : allNotices.notices2.length > 0 ? allNotices.notices2[0].title : lastNotice[0].two
      });
    } catch(err){
      console.log("error in setting lastNotice data :", err.message);
    }
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