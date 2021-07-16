const TelegramBot = require('node-telegram-bot-api');
const { tokenTele } = require('../constants');
const { sendCMA, sendHelp, KSMK } = require('./priceAction');
const schedule = require('node-schedule');
const moment = require('moment');

// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(tokenTele, {polling: true});

const listen = () => {
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
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
            sendHelp(chatId , bot , `@${msg.from.username}`);
        }
        // send a message to the chat acknowledging receipt of their message
        // bot.sendMessage(chatId, 'Received your message');
    });
    BCTH();
}

const BCTH = () => {
    schedule.scheduleJob('0 */1 * * *', async () =>{
        if(moment().hours() % 4 == 0){
            await sendCMA(chatId, 'btc' , bot);
            await KSMK('btc' , '-1001582548049', bot);
        }
    });
}

module.exports= {
    listen: listen
} 