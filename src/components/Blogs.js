import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import './Blogs.css'
import { Link } from 'react-router-dom'

const Blogs = () => {
  return (
    <div className='Blog-Section'>
        <Navbar />

        <div className='blog-div'>
            <div className='blog-item'>
                <Link to='/nuclei'>Securing Your Infro: Exploring Nuclei's Defense Arsenal</Link>
                <p>14 Jun 2023</p>
            </div>
            <div className='blog-item'>
                <Link to='/hunt'>Hunt the Hacker</Link>
                <p>21 April 2023</p>
            </div>
            <div className='blog-item'>
                <Link to='/takeover'>Accidental Account takeover</Link>
                <p>10 Oct 2022</p>
            </div>
            <div className='blog-item'>
                <Link to='/pentest'>Android Pentesting Setup on Macbook M1</Link>
                <p>10 April 2022</p>
            </div>
            <div className='blog-item'>
                <Link to='/djangoDebug'>Automation and Django Debug</Link>
                <p>5 Feb 2022</p>
            </div>
            <div className='blog-item'>
                <Link to='/domainTakeover'>Domain takeover of shopify based apps</Link>
                <p>8 Aug 2021</p>
            </div>
            <div className='blog-item'>
                <Link to='/S3'>S3 leaking the data Call the plumber</Link>
                <p>24 Jun 2021</p>
            </div>
            <div className='blog-item'>
                <Link to='/jioMart'>Story of my first Bug on JioMart parameter Temparing</Link>
                <p>2 Aug 2020</p>
            </div>

        </div>

        <div className='Blog-hr' />
         <Footer />

    </div>
  )
}

export default Blogs