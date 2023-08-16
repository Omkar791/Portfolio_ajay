import React from 'react'
import '../../BlogPages/Blogpages.css'
import Navbar from '../../Navbar'
import imgOne from '../../../assets/5DjangoDebugImg/one.png'
import imgTwo from '../../../assets/5DjangoDebugImg/two.png'
import Footer from '../../Footer'


const myText1=`
JShunter(){

    getJS — input domains.txt — complete — resolve | xargs wget
    
    for file in $(ls);do js-beautify $file | anew jsfiles/$file;done
    
    cd jsfiles
    
    for file in $(ls);do cat $file | gf s3-buckets | anew ../Secrects/buckets.txt
    
    }
    
`

const myText2=`
cat Secrects/$file.txt | notify -silent
`

const DjangoDebug = () => {
  return (
    <div>
        <Navbar />

        <div className='BlogpageWrapper'>
            <h1>Automation And Django Debug</h1>

            <p>Today i am Going Cover how Automation helps in Bug Bounty. And How i approach to this And Second Topic Will Be Django Debug=True</p>

            <h3>Open S3 Bucket With All Permission</h3>

            <p>
            Always Check JavaScript Files for hardcoded credentials , api Keys , api endpoints and for S3-buckets Also. But there Are two many files and we dont have time so what to do.
            </p>

            <p>We have Some Cool Tools To Automate this Process</p>
            <p>
                <a href='https://github.com/003random/getJS' target='_blank'>getJS is a tool to extract all the javascript files from a set of given urls.</a>
            </p>

            <p>getJS To Download All JavaScript Files.</p>

            <p>Gf is a wrapper Around Grep and made by legend</p>
            <p><a href='https://github.com/tomnomnom/gf' target='_blank'>https://github.com/tomnomnom</a></p>

            <p>js-beautify tool to beautify the Javascript Code</p>
            <p>bash Function</p>

            <div className='command-div'>
                <pre>{myText1}</pre>
            </div>

            <p> This is how I extract S3 Buckets , Secrect keys from JS Files and send them on my Discord Server using notify tools</p>
            <div className='command-div'>
                <pre>{myText2}</pre>
            </div>  

            <p>People Who Dont know about notify can refer this- 
                <a href='https://anubhav-singh.medium.com/notification-system-for-your-bug-bounty-automation-7b13af1b7372'> Notification system for your Bug Bounty Automation</a>
            </p>

            <p>After Finding The buckets you can Check Permissions by AWS CLI</p>

            <img src={imgOne} />
            
            <p>aws s3 ls s3://target-bucket || aws s3 cp payload.txt s3://target-bucket</p>

            <h3>Django Debug</h3>

            <p>Django Debug=True is use in Development for debug the Errors. if developers forget to turn off or to make it False it will be nightmare to the Company</p>

            <p>By Generating the 504 Internal Server Error . server thorws the All Env Variable at Error Page . So how to Generate this Error</p>
            <p>make PUT requests at /admin api Server will Throw the 504 Page In Response</p>

            <img src={imgTwo} />

            <h3>Thank you for reading this.</h3>


        </div>

        <Footer />
    </div>
  )
}

export default DjangoDebug