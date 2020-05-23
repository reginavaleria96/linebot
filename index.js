const line = require('@line/bot-sdk');
const express = require('express');

const config = {
    channelAccessToken: "J8F6RBiQkhmOkT5juYtc0RyDwmMDAM1Tbv1u+K0iFHPxd1xp+6FYnL9xxEs8QU6iM4mdk2bsm41ATQwfh3HaeHD89I3fkSX9Jven2TWiBnQju/qd/BrqDeXm4aH4Ej0DiuZaqXG8t9Pl+1mnxqK1igdB04t89/1O/w1cDnyilFU=",
    channelSecret: "f5474c87d273466fee633506956b5c8e"
};
const client = new line.Client(config);
const app = express();

app.get('/', (req, res) => {
    res.send('There\'s nothing here...');
    res.send(404);
});
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(mainProgram))
        .then((result) => res.json(result))
        .catch((error) => {
            console.error(`Promise error ${error}`);
        });
});

function mainProgram(event){
  if(event.type !== 'message' || event.message.type !== 'text') { //jika user tidak mengirimkan pesan berupa teks (bukan gambar, lokasi, atau sejenisnya)
    return Promise.resolve(null); //abaikan pesan
  }
  return client.replyMessage(event.replyToken, {type:'text', text: 'Hello, world'}); //balas dengan pesan "Hello, world"
}
