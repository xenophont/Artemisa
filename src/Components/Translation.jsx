import React from 'react'

export default function Translation({ doStuff, setInput }) {
  return (
    <div className='translation-area'>
        <textarea
          className='text-area'
          cols={55}
          rows={10} 
          placeholder="Enter text here..." 
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button className='action-btn' onClick={doStuff}>
            Do your stuff
        </button>
    </div>
  )
}
