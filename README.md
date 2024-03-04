# Automated-IMS-Notice-Sender

Created this project to automate the process of checking college nottices everytime one was released.
This projects scrapes the college website hourly and sends the new pdfs to the user on whatsapp using `WhatsApp Buisness API`.
While this api has some message pricing limitations, lack of support for groups and lack of resources to study for in a beginner friendly way, it was certainly fun to work with.

## Table of contents

1. Introduction.
2. Pre-Requisites and Dependencies.
3. Installation and Setup.
4. Hosting and Branches.
5. Credits and References.

### Introduction
This project uses `Puppeteer` library to scrape the web, `Whatsapp Buisness API` to send the data to the user and other node packages like  `Express.js` , `mongoose` etc.
It is hosted on [Render](render.com) with `Docker` enviornment to enable chromium installation on servers.
The project also requires some external tools which will be discussed in `Hosting and Branches`.
```
Note :-  Although this project can be used by anyone, the structure of websiteyou want to scrape will always be different, so make sure to change scraping structure. Feel free to contact me in case of any doubts.
```

### Pre-Requisites and Dependencies.
Make sure to have these few things before setting up the project locally -- 
1. A Meta Developer's account.
2. WhatsApp Buisness account ( Gives you a free temporary buisness number when you setup an app).
3. Account on Render.com
4. Account on Uptime Robot(Optional)
5. Account on Cron Jobs(Optional)
6. A mongodb Atlas Account

### Installation and Setup.

1. Clone the repo in your local machine.
    ```
      git clone https://github.com/DevanshArora312/Automated-IMS-Notice-Sender.git
      cd Automated-IMS-Notice-Sender
      npm i
    ```
2. Make your .env file
   ```
    VERIFY_TOKEN = (Whatsapp webhook verify token)
    PHONE_NUMBER_ID = (Whatsapp business number phone id)
    WHATSAPP_TOKEN = (Whatsapp  access token)
    SEND_TO = (country code + the number to which you want to send the messages to, format it like 91XXXXXXXXXX, where 91 is country code)
    DB_URL = (your mongodb url)
   ```

### Hosting and Branches

#### Hosting
For hosting this project, use [Render](render.com) , that's what I have used at the very least.
Upload your code to github, connect the repo to render and host it as a web service in a `Docker` enviornment (yes, not node).
That makes the basic setup of our web-service complete.
Further steps are purely optional.
To make sure your app does not fall off after 15 minutes of inactivity(which happens in render) , set up a website monitor using uptime robot to ping your site in every 5-10 minutes.
Now if you'd like the bot to scrape the website and send message automatically after some time intervals. Deploy a cron-job [here](cron-job.org).

#### Branches
1. `main` - Pretty straight-forward, the master branch.
2. `prod-test` - Branched to test various new features or deployment builds.
3. `render-deploy` - The branch with all render deployed code and testing. Merged with main.
4. `vercel-deployed-timout-issue` - The branch with all vercel deployed code and testing, code initially configured for aws-lambda based deployments like vercel. Deployment scrapped due to 10s request timout bound.
5. `cron-job-api` - A separate api for to work as a cron-job, depriciated as now the service uses [Cron-Job](cron-job.org).
6. `local-stable` - A branch which contains the initial build for the project, works on local machines but not fit for cloud deployment.
 
### Credits and References

Some of the Resources that helped me throughout the project are listed below -
1. [Deployment Guide](https://www.youtube.com/watch?v=6cm6G78ZDmM&t=815s)
2. [Whatsapp Business Api Docs](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)
3. [Cron-Jobs](cron-job.org)
4. [Uptime Robot](https://uptimerobot.com/)
5. [API Testing](https://web.postman.co/)
6. Last but not the least, ChatGPT.
