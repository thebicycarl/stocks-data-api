// Define the web scraper

const cheerio = require('cheerio')

let type = 'history'

async function scrapeData(ticker) {
    try {
        // Fetch the page html
        const url = `https://finance.yahoo.com/quote/${ticker}/${type}?p=${ticker}`
        const res = await fetch(url)
        const html = await res.text()

        const $ = cheerio.load(html)
        const price_history = getPrices($)
        return price_history
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

// Middleware
app.use(express.json())
app.use(require('cors')())
app.use(express.static('public'))


// Define API endpoints to access stock data, and call webscraper

app.post('/api', async (req, res) => {
    const { stock_ticker: ticker} = req.body
    console.log(ticker)
    const prices = await scrapeData(ticker)
    res.status(200).send({ prices })
})

app.listen(port, () => {console.log(`Server has started on port: ${port}`)})