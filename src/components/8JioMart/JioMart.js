import React from 'react'
import Navbar from '../Navbar'
import '../BlogPages/Blogpages.css'
import imgOne from '../../assets/8JioMartImg/one.png'
import imgTwo from '../../assets/8JioMartImg/two.png'
import imgThree from '../../assets/8JioMartImg/three.png'
import imgFour from '../../assets/8JioMartImg/four.png'
import imgFive from '../../assets/8JioMartImg/five.png'
import imgSix from '../../assets/8JioMartImg/six.png'
import Footer from '../Footer'

const JioMart = () => {
  return (
    <div>
        <Navbar />

        <div className='BlogpageWrapper'>
            <h1>Story of my first Bug on #jiomart parameter Temparing</h1>
            <p>Hello Everyone,</p>
            <p>So whats is Parameter Temparing</p>
            <p>
                <strong>The Web Parameter Tampering attack is based on the manipulation of parameters exchanged between client and server in order to modify application data, such as user credentials and permissions, price and quantity of products, etc. Usually, this information is stored in cookies, hidden form fields, or URL
                Query Strings, and is used to increase application functionality and control.
                </strong>
            </p>
            <p>Let us kick of this process with #Jiomart First</p>
            <p>I first try to tamper with the value of a product which will later on be added to the cart. Then I fire the Burpsuite and start looking for the parameter values. I realise that I can’t get any parameter values because of the security measures taken by Jio.</p>

            <img src={imgOne} />
            <img alt="" className='video' src="https://miro.medium.com/v2/resize:fit:625/1*OHWMgwZI0j_mX2rE8SRmJg.gif"></img>

            <p>In the Cart, there is button that says: Place A Order. I captured requests using Burpsuite; but I was still unable to get parameter Value.</p>
            <p>I then moved on to the Make Payment Page. Here I performed the same steps. I tried captured requests using Burpsuite and this time I was successful. I got the value of the parameter because there was no encryption at this point.</p>

            <img src={imgTwo} />

            <p>I then changed the amount Parameter to 10 and then forwarded the requests. It displayed the information that said the Error Amount was Less than the Cart value. The question that might arise is how? What happened at the backend? The answer to such a seemingly complex question is somewhat simple. At the backend, the cart value was compared with amount that was to be paid, a discrepancy was observed and hence an error was thrown.</p>

            <img src={imgThree} />
            <p>
            UFF! Now what to do? The answer again; is simple. Change the value of amount to cart value and then forward the requests. After forwarding the requests, I landed on the Payment Page.
            </p>

            <img src={imgFour} />

            <p>I started the Payment Process and then began to capture the Requests. At this point, I came across something really interesting.</p>

            <img src={imgFive} />

            <p>I changed the Order total value to 10 and then forward the request. After that I logged into my Phone Pay account(an online service) and BOOM the value has been changed to 10. After completing the payment process the order was placed.</p>

            <img src={imgSix} />

            <p>Thanks <a href='https://www.linkedin.com/in/aishwarya-kanchan-34b6841a5/' target='_blank'> Aishwarya</a> for Editing.</p>

            <h3>Thank you for reading.</h3>

        </div>

        <Footer />
    </div>
  )
}

export default JioMart

