const cheerio = require('cheerio');
const request = require('request-promise');
const colors = require('colors');

async function init() {
    const $ = await request({
        uri: 'https://www.cronista.com/MercadosOnline/dolar.html',
        transform: body => cheerio.load(body)
    });

    console.log('Estas son las cotizaciones del dolar en Argentina al día de la fecha.\n'.yellow);

    $('section.markets table tbody tr').each((i, el) => {
        const name = $(el).find('td.name a').text().replace('�', 'Ó');
        const buy = $(el).find('td.buy a div.buy-wrapper div.buy-value').text();
        const sell = $(el).find('td.sell a div.sell-wrapper div.sell-value').text();
        const percentage = $(el).find('td.percentage a span').text();

        console.log(`${name}\n${'COMPRA:'.green} ${buy}\n${'VENTA:'.green} ${sell}\n${'VARIACIÓN:'.green} ${percentage}\n`);
    })
}

init();