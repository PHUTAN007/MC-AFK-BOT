const mineflayer = require('mineflayer');

const botArgs = {
    host: 'dottyback.aternos.host', // :warning: เปลี่ยนเป็น IP Aternos ของคุณ
    port: 40029,                     // พอร์ตปกติของ Aternos
    username: 'AFK_Bot_Aternos',     // ชื่อบอทในเกม
    version: '1.21.1'                // เวอร์ชันมอดแพ็ก Cobbleverse
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log(`[${new Date().toLocaleTimeString()}] บอทเข้าเซิฟเวอร์สำเร็จแล้ว!`);
    });

    bot.on('spawn', () => {
        console.log('บอทเกิดแล้ว พร้อมใช้งาน');
    });

    // ป้องกันบอทหลุด (เตะแล้วเข้าใหม่เองอัตโนมัติภายใน 10 วินาที)
    bot.on('end', (reason) => {
        console.log(`บอทหลุดจากเซิฟเวอร์เนื่องจาก: ${reason} กำลังเชื่อมต่อใหม่ใน 10 วินาที...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('เกิดข้อผิดพลาด:', err);
    });

    // สั่งให้บอทกระโดดขยับตัวทุกๆ 1 นาที เพื่อไม่ให้ระบบ Aternos เตะข้อหา AFK
    setInterval(() => {
        if (bot.entity) {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }
    }, 60000);

    // สั่งให้บอทพิมพ์ข้อความทุกๆ 5 นาที หลอกระบบว่ายังมีผู้เล่นแอคทีฟอยู่
    setInterval(() => {
        bot.chat(`[AFK Bot] กำลังเฝ้าเซิฟเวอร์อยู่จ้า~ (${new Date().toLocaleTimeString()})`);
    }, 300000);
}

createBot();

// ป้องกัน Cloud ปิดตัว (สร้าง Web Server หลอกๆ ไว้ตามกฎของ Render)
const http = require('http');
http.createServer((req, res) => {
    res.write("Bot is running!");
    res.end();
}).listen(process.env.PORT || 3000);
