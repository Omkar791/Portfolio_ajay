import React from 'react'
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import imgOne from '../../../assets/7S3Leaking/one.jpg'
import imgTwo from '../../../assets/7S3Leaking/two.jpg'
import imgThree from '../../../assets/7S3Leaking/three.jpg'
import imgFour from '../../../assets/7S3Leaking/four.jpg'

const S3Leaking = () => {
  return (
    <div>
        <Navbar />

        <div className='BlogpageWrapper'>

            <h1>S3 leaking the data Call the plumber</h1>

            <p>Hello People,</p>
            <p>So What is S3 Bucket</p>

            <p>S3 bucket is a service offered by Aws for storing data like images ,video.</p>

            <p>And also we can host a static web page on s3 bucket. Meaning of s3 is simple Storage service .</p>

            <p>Nowadays, every company on cloud uses S3 to store the data of a customer. If developers make mistakes in IAM Roles; it will be a disaster.</p>

            <p>IAM roles in Aws — Identity and Access Management. By setting iam roles we can</p>
            <p>Set permissions and decide who can add, delete, access the data.</p>

            <p>Se developers need to set it very carefully.</p>
            <p>Let See from Hacker perspective, how one can find buckets and exploit it.</p>

            <p>So, I am hunting on private program on hackerone, (I can’t disclose the name as per policy). We can call it taryet.com. First I enumerated all subdomains using Subfinder ,which is made in Go by Project Discovery Team; they are legends.</p>

            <p><a href='https://github.com/projectdiscovery' target='_blank'>https://github.com/projectdiscovery</a></p>

            <p>Okay back to the Topic, after enumerating Subdoamins I checked every subdomain</p>
            <p>Manually, clicked every button and link on page.</p>
            <p>There is Extension on firefox S3 Bucket List</p>

            <p><a href='https://addons.mozilla.org/en-US/firefox/addon/s3-bucket-list/' target='_blank'>https://addons.mozilla.org/en-US/firefox/addon/s3-bucket-list/</a></p>

            <p>Every request which you made from your bowser this extension capture and</p>

            <p>Check if it going to S3 or not if S3 service deleted it saves the name in list</p>

            <p>And you can check permission itself there But i prefer the manual method</p>

            <p>And you should be Dont be lazy.</p>

            <p>After many clicks and checking function i got a bucket name.</p>

            <p>I fired my terminal. Before going to the exploit part you have to configure the</p>
            <p>Aws keys in computer</p>

            <p>Sudo apt-get install aws-cli or pip3 install awscli</p>
            <p>$ aws configure</p>
            <p>AWS Access Key ID: MYACCESSKEY</p>
            <p>AWS Secret Access Key: MYSECRETKEY</p>
            <p>Default region name [us-west-2]: us-west-2</p>
            <p>Default output format [None]: json</p>
            <p>You will get this keys on aws console iam settings</p>

            <img className='video' src={imgOne} />

            <h3>Exploitation Part</h3>
            <p>So Bucket name looks like this</p>
            <p><a href='https://bucket_name.s3.amozoneaws.com'>https://bucket_name.s3.amozoneaws.com</a></p>
            <p>First check the if we can upload and delete any file in bucket</p>
            <p>Start your terminal and try this command</p>
            <p>aws s3 cp payload.txt s3://bucket_name #adding malicious file</p>
            <p>aws s3 mv data.txt s3://bucket_name # delete the file from bucket</p>
            <p>In my case both both are secured</p>

            <img className='video' src={imgTwo} />
            <p>After that i check every folder on bucket by listing</p>
            <p>Aws s3 ls s3://bucket_name/folder_name</p>

            <img src={imgThree} />

            <p>My reaction was oh my God so much data!</p>
            <p>I download every sensitive data it contains. For POC</p>
            <p>Aws s3 cp s3://bucker_name/folder/file.txt ./ # to download a file</p>
            <p>Yay , i was awarded 100$</p>

            <img src={imgFour} />

            <p>I know its to low for high severity bug what can you except from Indian Company.</p>
            <h3>Happy Hacking :))</h3>





        
        </div>

        <Footer />
    </div>
  )
}

export default S3Leaking