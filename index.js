const mineflayer = require('mineflayer');

const botArgs = {
    host: 'poohTHH.aternos.me', // ใส่ IP เซิฟเวอร์ตรงนี้ (ไม่มี พอร์ต)
    port: 40029,                  // ใส่ พอร์ต ตรงนี้ (ถ้าไม่มีให้ใส่ 25565)
    username: 'AFK_Bot',          // ตั้งชื่อบอทของคุณ
    version: '1.21.1'             // ใส่เวอร์ชันของเซิฟเวอร์ (เช่น 1.20.1, 1.21 เป็นต้น)
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('login', () => {
        console.log([${new Date().toLocaleTimeString()}] บอทเข้าเซิฟเวอร์สำเร็จแล้ว!);

        // ถ้าเซิฟเวอร์ต้องพิมพ์ /register หรือ /login ให้เปิดใช้งานโค้ดด้านล่างนี้
        // setTimeout(() => {
        //     bot.chat('/login รหัสผ่านของคุณ');
        // }, 3000);
    });

    bot.on('spawn', () => {
        console.log('บอทเกิดแล้ว พร้อมใช้งาน');
    });

    // ป้องกันบอทหลุด (เตะแล้วเข้าใหม่เองอัตโนมัติ)
    bot.on('end', (reason) => {
        console.log(บอทหลุดจากเซิฟเวอร์เนื่องจาก: ${reason} กำลังเชื่อมต่อใหม่ใน 10 วินาที...);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log('เกิดข้อผิดพลาด:', err);
    });
}

createBot();

// ป้องกัน Cloud ปิดตัว (สร้าง Web Server หลอกๆ ไว้)
const http = require('http');
http.createServer((req, res) => {
    res.write("Bot is running!");
    res.end();
}).listen(process.env.PORT || 3000);
