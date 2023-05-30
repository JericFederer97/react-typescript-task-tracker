import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './quote-generator-styles.css'

// BODY
const QuoteGenerator = () => {
  // PROPERTIES
  const [quote, setQuote] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  
  // FUNCTIONS
  const quoteAPI = async () => {
    let arrayOfQuotes = []
    let randomQuoteData = []

    try {
      const data = await axios.get('https://type.fit/api/quotes')
      arrayOfQuotes = data.data
      const quoteNumber: number = Math.floor(Math.random() * arrayOfQuotes.length);
      randomQuoteData = arrayOfQuotes[quoteNumber]
    } catch (error) {
      console.log(error)
    }

    try {
      setQuote(randomQuoteData.text)
      
      if (randomQuoteData.author) {
        setAuthor(randomQuoteData.author)
      } else {
        setAuthor("Unknown")
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    quoteAPI()
  }, [])

  return (
    <div className='quote-container'>
      { 
        quote.length > 120 
        ? <div>
            <p className='quote-text'>{quote}</p>
            <p className='quote-author'>{author}</p>
          </div>
        : <div>
            <p className='quote-text'>{quote}</p>
            <p className='quote-author'>{author}</p>
          </div>
      }
      
      <button
        onClick={()=>(quoteAPI())}
      >
        New Quote
      </button>
    </div>
  )
}

export default QuoteGenerator