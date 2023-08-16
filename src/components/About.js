import React from 'react'
import './About.css'
import pic from '../assets/prof-pic.png'
import Navbar from './Navbar'
import Footer from './Footer'

const About = () => {
  return (
    <div className='about'>
        <Navbar/>
        <div className='About-Section'>
            <div className='Prof-Pic'>
                <img src={pic} />
            </div>

            <div className='About-Content'>
                <p>
                    Hey there, I'm Ajay Magar.I am Experienced Seurity Engineer, skilled in Penetration Testing, VAPT,
                    Web and Mobile Security. Secured over 100+ Application from variety of industries including e-commerce,
                    gaming and fintech.
                </p>
                <p>
                    Please feel free to connect with me on <a>LinkedIn</a> or reach out to me on Twitter.For any direct inquiries,
                    you can email me at magarajay538@gmail.com
                </p>
            </div>
            
        </div>

        <div className='About-hr'></div>
        <Footer />
    </div>
  )
}

export default About