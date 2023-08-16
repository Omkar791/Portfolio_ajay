import React from 'react'
import './HallOfFame.css'
import Navbar from './Navbar'
import Footer from './Footer'
import './BlogPages/Blogpages.css'

const HallOfFame = () => {
  return (
    <div className='fame'>
      <Navbar />
      <div className='BlogpageWrapper'>
        <h1>Hall Of Fame</h1>
        <p>I have been thanked and rewarded by various tech giants for finding security and vulnerabilities in their platforms. Here are a few ones:-</p>
        <ul className='company-names'>
          <li>H&M</li>
          <li>Jio Platforms</li>
          <li>Klaviyo</li>
          <li>Ryanair</li>
          <li>Fitpage</li>
          <li>Hubble</li>
        </ul>
      </div>
      <br/>
      <br/>
      <div className='nav-hr' />
      <Footer />
      
    </div>

  )
}

export default HallOfFame