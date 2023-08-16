import React from 'react'
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import '../1NucleiBlogPage/NucleiBlog.css'
import '../../BlogPages/Blogpages.css'
import imgOne from '../../../assets/1NucleiBlogImg/one.png'
import imgTwo from '../../../assets/1NucleiBlogImg/two.png'
import imgThree from '../../../assets/1NucleiBlogImg/three.png'
import imgFour from '../../../assets/1NucleiBlogImg/four.png'

const myText1=`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: Yourname/Yourapp
        ports:
        - containerPort: 3000

---
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  type: ClusterIP
  selector:
    app: myapp
  ports:
  - port: 8080
    targetPort: 3000
    `
const myText2=`
#!/bin/bash

nuclei -update-templates.   # Update to install New Templates 
# delte Unwanted Templates
rm -rf /root/nuclei-templates/iot /root/nuclei-templates/token-spray  /root/nuclei-templates/network /root/nuclei-templates/miscellaneous /root/nuclei-templates/technologies  /root/nuclei-templates/dns /root/nuclei-templates/osint /root/nuclei-templates/misconfiguration/http-missing-security-headers.yaml  /root/nuclei-templates/cves/2016/CVE-2016-6210.yaml  /root/nuclei-templates/cves/2018/CVE-2018-15473.yaml  /root/nuclei-templates/cves/2017/CVE-2017-5487.yaml /root/nuclei-templates/ssl 
rm -rf /root/nuclei-templates/http/iot /root/nuclei-templates/http/token-spray /root/nuclei-templates/http/network /root/nuclei-templates/http/miscellaneous /root/nuclei-templates/http/technologies /root/nuclei-templates/http/dns /root/nuclei-templates/http/osint

echo "scan started" | notify -silent

# Nuclei Run Command 
nuclei -t /root/nuclei-templates -l ./urls.txt  --severity low,high,medium,critical -o nucleiop.txt

# get Output in Discord Or Slack Channel. Also you can create Jira ticket read Docs.
cat nucleiop.txt | notify -silent 

echo "scan completed" | notify -silent
`
const myText3=`
FROM golang:1.20-bullseye

RUN go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest

RUN go install -v github.com/tomnomnom/anew@latest && \
    go install -v github.com/projectdiscovery/notify/cmd/notify@latest

WORKDIR /app

COPY ./nuclei_scan .       # above bash script 

COPY ./urls.txt .        # list of FQDN urls 


COPY ./provider-config.yaml /root/.config/notify/provider-config.yaml # config file for notify


RUN chmod +x nuclei_scan


CMD ["sh" ,"nuclei_scan"]
`

const myText4=`
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nuclei-scan-cronjob
spec:
  schedule: "0 0 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          dnsPolicy: ClusterFirst
          dnsConfig:
            nameservers:
              - 8.8.8.8
          containers:
            - name: nuclei-scan-container
              image: yourreponame/imagename:latest
          restartPolicy: OnFailure
          `

const myText5=`
name: CI/CD
on:
  push:
    branches:
      - main
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Configure Google Cloud SDK
      uses: google-github-actions/setup-gcloud@v0.3.0
      with:
          project_id: yourProjectName
          service_account_key: \${{ secrets.GCP_SA_KEY }}

    - name: Trigger the Job
      run: |
          gcloud container clusters get-credentials YourClusterName --region=RegionName
          kubectl create job --from=cronjob/nuclei-scan-cronjob nuclei-scan-manual
          `

const myText6=`
service_account_key: \${{ secrets.GCP_SA_KEY }}.
Go the google Cloud console -> IAM -> Service Account -> keys - JSON KEYS 
store that JSON key in Github Secrets.
`
const myText7=`
# FQDN URLS 
http://juiceapp.default.svc.cluster.local:9000
http://myapp.default.svc.cluster.local:8080
http://myapi.default.svc.cluster.local:5000
http://djangoboy.default.svc.cluster.local:8086

# This is how we can Access Internal apps in K8s
`

const myText8=`
gcloud container clusters create clustername --num-nodes=3.
#command to create Cluster In google Cloud
`
const myText9=`
docker build -t yourreponame/imagename:latest

docker push yourreponame/imagename:latest
`
          

const NucleiBlog = () => {
  return (
    <div>
        <Navbar />
        <div className='BlogpageWrapper'>
            <h1>Securing Your Infra: Exploring Nuclei’s Defense Arsenal</h1>
            <p>
            Hello Folks I came up with a New Project in Devsecops. This Project is Inspired by this ProjectDiscovery blog — https://blog.projectdiscovery.io/implementing-nuclei-into-your-github-ci-cd-for-scanning-live-web-applications/
            </p>
            <p>
                <em>Our Main goal is to run Nuclei In Infrastructure to Dectect Vulnerabilities in early development and in Internal Apps.</em>
            </p>

            <p>I tried this above Project from project discovery In Our Github CI/CD and Noticed Some Limitations.</p>
    
            <ol>
                <li>workflows taking to much time to complete beacause of nuclei.</li>
                <li>Not able to Scan Internal apps which are not hosted Publically (might be possible on self hosted runner)</li>
            </ol>

            <p>Now Days Everyone Switching to Kubernestes and Microservices. So we are</p>
            <p>
                <em>
                    How Devops Team Can Use this As DAST in CI/CD -/ Microservices has service endpoints like this http://api-backend.default.svc.cluster.local:9000 collect all these service endpoints in file called urls.txt and give this file as a input to nuclei. Now how nuclei will access this urls? deploy nuclei in K8s cluster as Cronjob and trigger the job after Push commit in master branch
                </em>
            </p>

            <p>
                I am Using GKE Cluster and hosted some Microservices over there.
            </p>

            <p>You can use any Service EKS , AKS , GKE ..etc</p>

            <div className='command-div'>
                <pre>{myText8}</pre>
            </div>

            <p>Demo of Internal app Microservice.</p>


            <div className='command-div'>
                <pre>{myText1}</pre>
            </div>

            <p>As you Can see i am Using ClusterIP and not Loadbalancer so No One Can Access this Publically.</p>
            <p>For demo Purpose I hosted 4 Services in my Cluster.</p>

            <img src={imgOne} />

            <p>
            So how Nuclei Works in K8s? I made a CronJob to Run Nuclei on these Services urls ( FQDN URLS ). CronJob will Run on Every Midnight. Also we can trigger the Job By kubectl Command so After Successful Build we can scan apps for Vulnerabilities.
            </p>

            <p>urls.txt</p>
            
            <div className='command-div'>
                <pre>{myText7}</pre>

            </div>

            <p>Main Script Where Nuclei Run — nuclei-scan.sh</p>
            
            <div className='command-div'>
                <pre>{myText2}</pre>
            </div>

            <p>
            Dockerfile to create Image for Above Script
            </p>

            <div className='command-div'>
                <pre>{myText3}</pre>
            </div>

            <div className='command-div'>
                <pre>{myText9}</pre>
            </div>

            <p>Cronjob manifest file</p>

            <div className='command-div'>
                <pre>{myText4}</pre>
            </div>

            <div className='command-div'>
                <pre>kubectl apply -f cronjob.yaml </pre>
            </div>

            <p>You can trigger this job manually by Kubectl command</p>

            <div className='command-div'>
                <pre>kubectl create job --from=cronjob/nuclei-scan-cronjob nuclei-scan-manual</pre>
            </div>

            <img src={imgTwo} />

            <p>
            Now how to use this in CI/CD. I am using github-action workflows for this
            </p>

            <div className='command-div'>
                <pre>{myText5}</pre>
            </div>

            <p>this is basic workflow there are multiple jobs in CI/CD process i am just showing how to configure GKE cluster in github-action and trigger the Job</p>

            <div className='command-div'>
                <pre>{myText6}</pre>
            </div>

            <img src={imgThree} />

            <p>After Successful Build we can trigger the Job to Scan the Apps.</p>

            <p>I used Notify tool from Projectdiscovery to send the nuclei output to my Discord Server.</p>

            <img src={imgFour} />

            <h2>Happy Hacking :))</h2>


        </div>
        <Footer />
    </div>
  )
}


export default NucleiBlog