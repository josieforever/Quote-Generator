const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


const quotesArray = []

//show loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
} 

//hide loading
function complete() {
    quoteContainer.hidden = false
    loader.hidden = true
}

async function getApiQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        const apiData = await response.json()
        quotesArray.push(apiData)
        generateQuote()
    } catch (error) {
        console.log(`aw-shucks -> ${error}`)
        quotesArray.push(localQuotes)
        
    }
    
}
 

console.log(quotesArray)


function generateQuote() {
    
    // using an IIFE to calll the firt function
    (function(){
        loading()
        const [apiArray] = quotesArray
    const apiQuotes = apiArray[Math.floor(Math.random() * apiArray.length)]
    //check if Author field is blank and replace with Unknown
    if (!apiQuotes.author) {
        authorText.textContent = 'unknown'
    } else {
        authorText.textContent = apiQuotes.author 
    }

    // Check quote length to determine styling
    if (apiQuotes.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.textContent = apiQuotes.text
    complete()
    } )(quotesArray)  
    
}



// tweet Quote
function tweetQuote() {
    const twitterUrl = `https:twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}


newQuoteBtn.addEventListener('click', generateQuote)
twitterBtn.addEventListener('click', tweetQuote)


//onLoad
getApiQuotes()