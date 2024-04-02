// Define the web scraper

const cheerio = require('cheerio')

let stockTicker = 'mrna'
let type = 'history'

async function scrapeData() {
    try {
        // Fetch the page html
        const url = `https://finance.yahoo.com/quote/${stockTicker}/${type}?p=${stockTicker}`
        const res = await fetch(url)
        const html = await res.text()

        const $ = cheerio.load(html)
        const price_history = getPrices($)
        console.log(price_history)


    } catch (err) {
        console.log(err.message)
    }
}

function getPrices(cher) {
    const prices = cher('td:nth-child(6)').get().map((current_value)=> {
        return cher(current_value).text()
    })
    return prices
}



// Intialize server 

const express = require('express')
const app = express()
const port = 8383



app.listen(port, () => {console.log(`Server has started on port: ${port}`)})

// Define API endpoints to access stock data, and call webscraper
