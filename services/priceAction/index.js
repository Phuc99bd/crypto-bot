const axios = require('axios');
const { endpoint, tokenC, tokenTele } = require('../../constants');
const moment = require('moment');

const formatPrice = (price) =>{
    return price;
}

const sendCMA = async (chatId, symbol, bot) => {
    let { data } = await axios.get(`${endpoint}/ticker/24hr?symbol=${symbol.toUpperCase()}USDT`).catch(err => {
        console.log(err);
    });
    if(data){
        bot.sendMessage(chatId , 
            `<b>${symbol.toUpperCase()}</b> \n`
            + `<i><b>Last price: </b> ${data.lastPrice}$ </i>\n`
            + `<i><b>Low price</b>: ${data.lowPrice}$ </i>\n`
            + `<i><b>Volume: </b>: ${data.volume}${symbol.toUpperCase()}</i>\n`
            + `<i><b>Price change 24h: </b> ${formatPrice(data.priceChange)}$ </i>\n`
            + `<i><b>Percent change 24h: </b> ${formatPrice(data.priceChangePercent)}% </i>\n`
            + `<i><b>High price</b>: ${data.highPrice}$ </i>\n`,
            {
                parse_mode: "HTML"
            });
        KSMK(symbol , chatId, bot);
    }

    
}

const KSMK = async (symbol, chatId, bot) => {
    const dataMarkets = await axios.get(`${endpoint}/klines?symbol=${symbol.toUpperCase()}USDT&interval=1h&limit=20`);
    if(dataMarkets.data && dataMarkets.data.length > 0){
        const data = getData(dataMarkets.data);
        const point = ((+data[0].close - +data[3].open) / +data[0].open) * 100;
        if(point > 1 || point < -1){
            bot.sendMessage(chatId ,
                `<b>${data[3].openTime} -> ${data[0].closeTime}</b>\n` 
                +`<b>${point > 1 ? 'Up' : 'Down'} ${point} %</b> \n`,
                {
                    parse_mode: "HTML"
                }
            );
        }else{
            bot.sendMessage(chatId ,
                `<b>${data[3].openTime} -> ${data[0].closeTime}</b>\n` 
                +`<b>Sideway giao động ${point}% \nGiá giao động tương đương ~ ${data[3].close} -> ${data[0].open}</b> \n`,
                {
                    parse_mode: "HTML"
                }
            );
        }
    }
}

const getData = (data)=> {
    data = data.reverse();
    data = data.map(e=> ({
        hight: e[2],
        low: e[3],
        close: e[4],
        open: e[1],
        vol: e[5],
        openTime: moment(e[0]).format('DD-MM-YYYY HH:mm:ss'),
        closeTime: moment(e[6]).format('DD-MM-YYYY HH:mm:ss')
    }))
    return data;
}

const sendChart = (chatId , symbol , bot) => {
    bot.sendMessage(chatId , 
        `<a href="http://www.example.com/">inline URL</a>`,
        {
            parse_mode: "HTML"
    });
}

const sendHelp = (chatId , bot , username) => {
    bot.sendMessage(chatId , 
        ` Hello @${username}, us, what can i do for you\n`
        + `<b>/p symbol</b>`,
        {
            parse_mode: "HTML"
        });
}

module.exports = {
    sendCMA,
    sendChart,
    sendHelp,
    KSMK
}