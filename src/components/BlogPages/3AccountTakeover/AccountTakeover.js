import React from 'react'
import '../../BlogPages/Blogpages.css'
import Navbar from '../../Navbar'
import imgOne from '../../../assets/3AccountTakeoverImg/one.png'
import imgTwo from '../../../assets/3AccountTakeoverImg/two.png'
import imgThree from '../../../assets/3AccountTakeoverImg/three.png'
import imgFour from '../../../assets/3AccountTakeoverImg/four.png'
import Footer from '../../Footer'

const AccountTakeover = () => {
  return (
    <div>
        <Navbar />

        <div className='BlogpageWrapper'>
            
            <h1>Accidental Account takeover</h1>
            <p>Hello Security Community,</p>
            <p>
            Let’s start the writeup. I was testing a team management App. There are multiple roles and permission level functions.
             At the sign page there is an email address and password based authentication system. So i sign up with my Admin , manager and readonly accounts using firefox container.
            </p>
            <p>Email verification with token look like this.</p>

            <img src={imgOne} />

            <p>
            I copied this url from my mail box in chrome. I saw this token is uuid based and unguessable. I moved forward in the dashboard to check other functions. while testing the app. I tried to copy a link but somehow it didn’t work. I opened a private window and pasted that link but that copied link didn’t work so my clipboard already has an email verification link. i was in hurry i didn’t saw what i pasted and i clicked searched i saw dashboard of target app. I thought that token is for one time use but i am wrong. Then i searched that token in burp search function i got to know that its userID of user.
            </p>

            <img src={imgTwo} />
            <p>
            So i Started looking other users userID in responses of api. its team based app there is Users page i captured that request and in response i got userId of every user which are listed there.
            </p>

            <img src={imgThree} />
            <p>I got access of every employee which are in my team.</p>
            <p>
            To increase the severity i started looking this userID in other part of application. then i found out feedback page where multiple users and company employee commenting on each other feedback. GOLDMINE.
            </p>

            <img src={imgFour} />

            <p>I takeover employee account for poc.</p>

            <h3>Goodbye until next time!</h3>

        </div>

        <Footer/>
    </div>
  )
}

export default AccountTakeover