import React from 'react'
import Navbar from '../../Navbar'

import imgOne from '../../../assets/6DomainTakeoverImg/one.png'
import imgTwo from '../../../assets/6DomainTakeoverImg/two.png'
import imgThree from '../../../assets/6DomainTakeoverImg/three.png'
import imgFour from '../../../assets/6DomainTakeoverImg/four.png'
import Footer from '../../Footer'


const DomainTakeover = () => {
  return (
    <div>
        <Navbar />

        <div className='BlogpageWrapper'>

            <h1>Domain takeover of shopify based apps</h1>
            <p>
            So first of all what is shopify, shopify is a canadian multinational, E-commerce company. Basically it is a cloud service provider that allows you to create an e-commerce website in a super easy way.
            </p>

            <p>I guess everyone is familiar with Subdomain takeover if not Then read this.</p>
            <p><a href='https://medium.com/@Hacker0x01/a-guide-to-subdomain-takeovers-ddebe0684a58'>https://medium.com/@Hacker0x01/a-guide-to-subdomain-takeovers-ddebe0684a58</a></p>

            <p>Lets Start how i exploit this.</p>
            <p>I am not hunting on this target , i found it accidentally. I am searching jeans for me then i remembered my friend suggest me about this target. so i google about that. So first 2 3 result are target.com. before they have domain with another_name.in.</p>
            <p>I found another_name.in 5 or 6 th result of google search.When i opened korra.in. i saw this type of error page</p>

            <img src={imgOne} />

            <p>So next step is who is the owner of this domain.I opened whois.com and search korra.in</p>
            <p>Whosis.com is a application where we can find about domain names. Like they are available or not , who is the owner , expiry date , ip addresses etc etc</p>

            <img src={imgTwo} />

            <p>This company is parent org of target.com. So till here we know that who own this assets.</p>

            <p>Now this is the time to attack….!</p>

            <p>I created a trial version account on shopify by the name of target.com which is not required you can give any name.</p>

            <img src={imgThree} />

            <p>After that navigate to the sales channel — Domains and in third party domains add the vulnerable domain name. And connect it to the attacker apps</p>

            <p>After that attacker app look like this-</p>

            <img src={imgFour} />

            <p>As you can see i takeover the domain name. I can host anything on this domain</p>

            <p>Impact — attacker can run scams with this domain. And company have to face legal issues.</p>

            <p>Company doesn’t have the bug bounty program but they rewarded me with small xxxx INR</p>

            <p>After bounty-</p>

            <img className='video' src="https://miro.medium.com/v2/resize:fit:600/0*Lj8R_bS-DVNrW7st"></img>

            <h3>Happy Hacking :))</h3>


        </div>
        <Footer />
    </div>
  )
}

export default DomainTakeover