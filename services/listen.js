const TelegramBot = require('node-telegram-bot-api');
const { tokenTele } = require('../constants');
const { sendCMA, sendHelp } = require('./priceAction');
const schedule = require('node-schedule');
const moment = require('moment');

// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(tokenTele, {polling: true});

const listen = () => {
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        console.log(msg);
        if(msg?.text.includes('/p')){
            const symbol = msg.text.split(' ')[1];
            if(symbol && symbol != ''){
                sendCMA(chatId, symbol , bot);
            }
        }
        if(msg?.text.includes('/c')){
            const symbol = msg.text.split(' ')[1];
            if(symbol && symbol != ''){
                sendChart(chatId, symbol , bot);
            }
        }
        if(msg?.text.includes('/help')){
            sendHelp(chatId , bot , `@${msg.chat.username}`);
        }
        // send a message to the chat acknowledging receipt of their message
        // bot.sendMessage(chatId, 'Received your message');
    });
    BCTH();
}

const BCTH = () => {
    schedule.scheduleJob('0 6 * * *', function(){
        bot.sendMessage('-1001582548049' ,`<i><b>Cập nhật tình hình BTC vào ngày ${moment().toLocaleString()}</b></i>` , {
            parse_mode: 'HTML'
        })
        sendCMA('-1001582548049', 'btc' , bot);
    });
    schedule.scheduleJob('0 18 * * *', function(){
        bot.sendMessage('-1001582548049' ,`<i><b>Cập nhật tình hình BTC vào ngày ${moment().toLocaleString()}</b></i>` , {
            parse_mode: 'HTML'
        })
        sendCMA('-1001582548049', 'btc' , bot);
    });
}

module.exports= {
    listen: listen
} 