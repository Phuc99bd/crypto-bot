const axios = require('axios');
const { endpoint, tokenC, tokenTele } = require('../../constants');

const formatPrice = (price) =>{
    return price.toFixed(5);
}

const sendCMA = async (chatId, symbol, bot) => {
    let { data } = await axios.get(`${endpoint}?data=assets&key=${tokenC}&symbol=${symbol}`).catch(err => {
        console.log(err);
    });
    if(data){
        data = data.data[0];
        bot.sendMessage(chatId , 
            `<b>${symbol.toUpperCase()}</b> \n`
            + `<i>price: <u>${formatPrice(data.price)}$</u> </i>\n`
            + `<i>percent change 24h: <u>${formatPrice(data.percent_change_24h)}%</u> </i>\n`
            + `<i>percent change 7d: <u>${data.percent_change_7d}%</u> </i>\n`
            + `<i>percent change 30d: <u>${data.percent_change_30d}%</u> </i>\n`
            + `<i>volume 24h: <u>${formatPrice(data.volume_24h)}</u> </i>\n`
            + `<i>price open candy: <u>${formatPrice(data.open)}$</u> </i>\n`
            + `<i>ATH: <u>${formatPrice(data.high)}$</u> </i> \n`,
            {
                parse_mode: "HTML"
            });
    }
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
        ` Hello ${username}, us, what can i do for you\n`
        + `<b>/p symbol</b>`,
        {
            parse_mode: "HTML"
        });
}

module.exports = {
    sendCMA,
    sendChart,
    sendHelp
}