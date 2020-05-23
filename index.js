const { LineBot } = require("bottender");
const { createServer } = require("bottender/express");

// var request = require('request');

const bot = new LineBot({
  // ubah ke access token dan channelSecret dibawah, sesuai dengan yang ada di line console
  accessToken: "J8F6RBiQkhmOkT5juYtc0RyDwmMDAM1Tbv1u+K0iFHPxd1xp+6FYnL9xxEs8QU6iM4mdk2bsm41ATQwfh3HaeHD89I3fkSX9Jven2TWiBnQju/qd/BrqDeXm4aH4Ej0DiuZaqXG8t9Pl+1mnxqK1igdB04t89/1O/w1cDnyilFU=",
  channelSecret: "f5474c87d273466fee633506956b5c8e"
});
bot.onEvent(async context => {
  // 1. Pengecekan apakah bot menerima chat berupa text
  if (context.event.isText) {
    // 2. Ambil value text yang dikirim oleh user, simpan di variabel receivedMessage
    const receivedMessage = context.event.text;
    // 3. Pengecekan apakah user mengirim 2 pasang string dengan spasi
    // Contoh valid text: 1 3 | 4 2 | 10 23
    if (receivedMessage.split(" ").length === 2) {
      // 4. Menyimpan hasil split. Kalau messagenya: "1 3" splittedText akan berisi ["1", "3"]
      const splittedText = receivedMessage.split(" ");
      // 5. Ambil 2 angka yang masih dalam bentuk string, sekaligus ubah menjadi Number (integer)
      const first = Number(splittedText[0]);
      const second = Number(splittedText[1]);
      // 6. Lakukan proses penjumlahan
      const sumResult = first + second;
      // 7. Balas pesan user dengan hasil penjumlahan 2 angka yang dikirim
      await context.replyText(sumResult);
    } else {
      // 8. Beri respon kepada user jika format pesan yang diberikan tidak sesuai
      await context.replyText(
        "Maaf pesanmu tidak sesuai format, contoh yang benar: 1 3 atau 10 12"
      );
    }
  }
	  // request.post({
		// headers: {'content-type' : 'application/json'},
		// url:     'https://ibmbotorchestrator.au-syd.mybluemix.net/orchestrator?method=forwardmsg',
		// body:    rawData
	// }, function(error, response, body){
		// console.log(body);
	// });
});
const server = createServer(bot);
server.listen(process.env.PORT || 5000, () => {
  console.log("server is running on 5000 port...");
});