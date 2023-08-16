import React from 'react'
import './HuntHacker.css'
import '../../BlogPages/Blogpages.css'
import Navbar from '../../Navbar'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


import imgOne from '../../../assets/2HuntHunterImg/one.png'
import imgTwo from '../../../assets/2HuntHunterImg/two.png'
import imgThree from '../../../assets/2HuntHunterImg/three.png'
import imgFour from '../../../assets/2HuntHunterImg/four.png'
import Footer from '../../Footer';


const myText1=`
gcloud config set compute/zone us-central1-a  # choose any region you want
`
const myText2=`
gcloud container clusters create clustername --num-nodes=3    # one master and 2 worker nodes
`

const myText3=`
gcloud container clusters get-credentials clustername 

# this will automatically configure your kubectl. 
`
const myText4=`
kubectl create clusterrolebinding cluster-admin-binding \

--clusterrole cluster-admin \

--user $(gcloud config get-value account)
`

const myText5=`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.0/deploy/static/provider/cloud/deploy.yaml
`
const myText6=`
kubectl get svc -n ingress-nginx
`

const myText7=`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 2         # 2 pods will create
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
        image: ajaymagar/nodeapp    # this is mine demo nodejs app 
        ports:
        - containerPort: 3000     # change this according to your app 

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
    targetPort: 3000    # change this according to your app

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-app
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
  - host: tech.ajaymagar.in         # change this or remove this 
    http:
      paths:
      - pathType: Prefix
        path: "/"                     # as per your app 
        backend:
          service:
            name: myapp
            port:
              number: 8080      
`
const myText8=`
kubectl apply -f deployment.yaml
`

const myText9=`
apiVersion: v1
kind: Secret
metadata:
  name: kibana-password
  namespace: kube-logging
type: Opaque
data:
  password: cGFzc3dvcmQ=
  `

const myText10=`
kind: Service
apiVersion: v1
metadata:
  name: elasticsearch
  namespace: kube-logging
  labels:
    app: elasticsearch
spec:
  selector:
    app: elasticsearch
  clusterIP: None
  ports:
    - port: 9200
      name: rest
    - port: 9300
      name: inter-node
`
const myText11=`
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: es-cluster
  namespace: kube-logging
spec:
  serviceName: elasticsearch
  replicas: 3
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      labels:
        app: elasticsearch
    spec:
      containers:
      - name: elasticsearch
        image: docker.elastic.co/elasticsearch/elasticsearch:7.2.0
        ports:
        - containerPort: 9200
          name: rest
          protocol: TCP
        - containerPort: 9300
          name: inter-node
          protocol: TCP
        volumeMounts:
        - name: data
          mountPath: /usr/share/elasticsearch/data
        env:
          - name: cluster.name
            value: k8s-logs
          - name: node.name
            valueFrom:
              fieldRef:
                fieldPath: metadata.name
          - name: discovery.seed_hosts
            value: "es-cluster-0.elasticsearch,es-cluster-1.elasticsearch,es-cluster-2.elasticsearch"
          - name: cluster.initial_master_nodes
            value: "es-cluster-0,es-cluster-1,es-cluster-2"
          - name: network.host
            value: "0.0.0.0"
          - name: xpack.security.enabled
            value: "true"
          - name: xpack.monitoring.collection.enabled
            value: "true"   
          - name: ES_JAVA_OPTS
            value: "-Xms512m -Xmx512m"   
          - name: ELASTIC_PASSWORD
            valueFrom:
              secretKeyRef:
                name: kibana-password
                key: password     
      initContainers:
      - name: fix-permissions
        image: busybox
        command: ["sh", "-c", "chown -R 1000:1000 /usr/share/elasticsearch/data"]
        securityContext:
          privileged: true
        volumeMounts:
        - name: data
          mountPath: /usr/share/elasticsearch/data
      - name: increase-vm-max-map
        image: busybox
        command: ["sysctl", "-w", "vm.max_map_count=262144"]
        securityContext:
          privileged: true
      - name: increase-fd-ulimit
        image: busybox
        command: ["sh", "-c", "ulimit -n 65536"]
        securityContext:
          privileged: true
  volumeClaimTemplates:
  - metadata:
      name: data
      labels:
        app: elasticsearch
    spec:
      accessModes: [ "ReadWriteOnce" ]
#      storageClassName: do-block-storage
      resources:
        requests:
          storage: 3Gi
`
const myText12=`
apiVersion: v1
kind: Service
metadata:
  name: kibana
  namespace: kube-logging
  labels:
    app: kibana
spec:
  ports:
  - port: 5601
  selector:
    app: kibana
`

const myText13=`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kibana
  namespace: kube-logging
  labels:
    app: kibana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kibana
  template:
    metadata:
      labels:
        app: kibana
    spec:
      containers:
      - name: kibana
        image: docker.elastic.co/kibana/kibana:7.2.0
        env:
          - name: ELASTICSEARCH_URL
            value: http://elasticsearch:9200
          - name: ELASTICSEARCH_USERNAME
            value: elastic
          - name: ELASTICSEARCH_PASSWORD
            valueFrom:
              secretKeyRef:
                name: kibana-password
                key: password
        ports:
        - containerPort: 5601
          name: kibana
          protocol: TCP
`

const myText14=`
apiVersion: v1
kind: ServiceAccount
metadata:
  name: fluent-bit-sa
  namespace: kube-logging
  labels:
    app: fluent-bit-sa

----

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: fluent-bit-role
  labels:
    app: fluent-bit-role
rules:
  - nonResourceURLs:
      - /metrics
    verbs:
      - get
  - apiGroups: [""]
    resources:
      - namespaces
      - pods
      - pods/logs
    verbs: ["get", "list", "watch"]

----

kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: fluent-bit-rb
roleRef:
  kind: ClusterRole
  name: fluent-bit-role
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: ServiceAccount
  name: fluent-bit-sa
  namespace: kube-logging
`
const myText15=`
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluent-bit-config
  namespace: kube-logging
  labels:
    k8s-app: f-bit-pod
data:
  # Configuration files: server, input, filters and output
  # ======================================================
  # Path /var/log/containers/ingress-nginx-controller-*.log  -> we only collecting ingress logs which we need for this project
  fluent-bit.conf: |
    [SERVICE]
        Flush         1
        Log_Level     info
        Daemon        off
        Parsers_File  parsers.conf
        HTTP_Server   On
        HTTP_Listen   0.0.0.0
        HTTP_Port     2020

    @INCLUDE input-kubernetes.conf
    @INCLUDE filter-kubernetes.conf
    @INCLUDE output-elasticsearch.conf

  input-kubernetes.conf: |
    [INPUT]
        Name              tail
        Tag               kube.*
        Path              /var/log/containers/ingress-nginx-controller-*.log   
        Parser            docker
        DB                /var/log/flb_kube.db
        Mem_Buf_Limit     5MB
        Skip_Long_Lines   On
        Refresh_Interval  10

  filter-kubernetes.conf: |
    [FILTER]
        Name                kubernetes
        Match               kube.*
        Kube_URL            https://kubernetes.default.svc:443
        Kube_CA_File        /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        Kube_Token_File     /var/run/secrets/kubernetes.io/serviceaccount/token
        Kube_Tag_Prefix     kube.var.log.containers.*
        Merge_Log           On
        Merge_Log_Key       log_processed
        K8S-Logging.Parser  On
        K8S-Logging.Exclude Off

  output-elasticsearch.conf: |
    [OUTPUT]
        Name            es
        Match           *
        Host            \${FLUENT_ELASTICSEARCH_HOST}
        Port            \${FLUENT_ELASTICSEARCH_PORT}
        HTTP_User       \${FLUENT_ELASTICSEARCH_USER}
        HTTP_Passwd     \${FLUENT_ELASTICSEARCH_PASSWORD}
        Logstash_Format On
        Replace_Dots    On
        Retry_Limit     False

  parsers.conf: |
    [PARSER]
        Name   nginx
        Format regex
        Regex ^(?<remote>[^ ]*) (?<host>[^ ]*) (?<user>[^ ]*) \[(?<time>[^\]]*)\] "(?<method>\S+)(?: +(?<path>[^\"]*?)(?: +\S*)?)?" (?<code>[^ ]*) (?<size>[^ ]*)(?: "(?<referer>[^\"]*)" "(?<agent>[^\"]*)")?(?<request_body>.*)$
        Time_Key time
        Time_Format %d/%b/%Y:%H:%M:%S %z
`
const myText16=`
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: f-bit-pod
  namespace: kube-logging
  labels:
    k8s-app: fluent-bit-logging
    version: v1
    kubernetes.io/cluster-service: "true"
spec:
  selector:
    matchLabels:
      k8s-app: fluent-bit-logging
  template:
    metadata:
      labels:
        k8s-app: fluent-bit-logging
        version: v1
        kubernetes.io/cluster-service: "true"
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "2020"
        prometheus.io/path: /api/v1/metrics/prometheus
    spec:
      containers:
      - name: fluent-bit
        image: fluent/fluent-bit:1.3.11
        imagePullPolicy: Always
        ports:
          - containerPort: 2020
        env:
        - name: FLUENT_ELASTICSEARCH_HOST
          value: "elasticsearch"
        - name: FLUENT_ELASTICSEARCH_PORT
          value: "9200"
        - name: FLUENT_ELASTICSEARCH_USER
          value: "elastic"
        - name: FLUENT_ELASTICSEARCH_PASSWORD
          valueFrom:
            secretKeyRef:
              name: kibana-password
              key: password
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
        - name: fluent-bit-config
          mountPath: /fluent-bit/etc/
      terminationGracePeriodSeconds: 10
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
      - name: fluent-bit-config
        configMap:
          name: fluent-bit-config
      serviceAccountName: fluent-bit-sa
      tolerations:
      - key: node-role.kubernetes.io/master
        operator: Exists
        effect: NoSchedule
      - operator: "Exists"
        effect: "NoExecute"
      - operator: "Exists"
        effect: "NoSchedule"
`
const myText17=`
npm init -y
sudo npm install axios elasticsearch form-data
touch app.js
`
const code = `
const axios = require('axios')  

const elasticsearch = require('elasticsearch');
const host = 'http://elasticsearch:9200';  // change to localhost when running in local system
const indexPattern = 'logstash-*';     // Elasticsearch index pattern | define in fluentd configmap file
const username = 'elastic';  //Elasticsearch username for basic authentication
const password = 'password';  // Elasticsearch password for basic authentication


const client = new elasticsearch.Client({
    host,
    httpAuth: \`\${username}:\${password}\`,
})
const paths = ['/etc/passwd','/.git','/.git/config','sleep','sysdate','config','/.ssh','/.aws','/.config'];
// you can add more signature as per your creativity 

const query = {
  bool: {
    must: [
      {
        range: {
          '@timestamp': {
            gte: 'now-15m',
            lte: 'now',
          },
        },
      },
      {
        bool: {
          should: [
            {
              bool: {
                should: paths.map(path => ({
                  match_phrase: {
                    log: path,
                  },
                })),
              },
            },
            {
              regexp: {
                log: ".*\\\\.php.*"       // this regex will find if anyone trying to access php file on server
            }
              }
            },
            {
              regexp: {
                log: ".*\\\\.yaml.*"     // this regex will find if anyone trying to access yaml files on server
            }
              }
            },
          ],
        }
      }
    ],
  },
};

client.search({
    index: indexPattern,
    scroll: '30s',     // how long a consistent view of the index should be maintained
    size: 1000,       // how many hits to return per batch
    body: {
      query,
    },
  }).then(response => {
    console.log(\`Found \${response.hits.total.value} logs:\`);
    const realdata = response.hits.hits.map(data=>{
        return data._source.log
      })
    console.log(realdata);     // we can see Log Files in coomand line by running this in localhost
}).catch(error => {
    console.error(\`Error querying Elasticsearch: \${error}\`);
});
`;

const code1 = `
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const discordWebhookUrl = 'url';

const realdata = /* data that came from elastic search api */;

async function sendToDiscordWebhook(webhookUrl, data) {
  try {
    // Write data to a temporary file
    const tempFilePath = path.join(__dirname, 'temp.txt');
    fs.writeFileSync(tempFilePath, JSON.stringify(data), 'utf-8');

    // Create a FormData instance
    const formData = new FormData();
    formData.append('content', 'Malicious Logs Files');
    formData.append('file', fs.createReadStream(tempFilePath), 'data.txt');

    // Upload the FormData as a multipart/form-data request to Discord webhook
    const response = await axios.post(webhookUrl, formData, {
      headers: formData.getHeaders()
    });

    console.log(\`Data sent to Discord webhook successfully. Response: \${response.status} \${response.statusText}\`);

    // Delete the temporary file
    fs.unlinkSync(tempFilePath);
    console.log(\`Temporary file deleted: \${tempFilePath}\`);
  } catch (error) {
    console.error(\`Failed to send data to Discord webhook. Error: \${error.message}\`);
  }
}

sendToDiscordWebhook(discordWebhookUrl, realdata);
`;

const code2 = `
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const discordWebhookUrl = 'url';
const elasticsearch = require('elasticsearch')
const host = 'http://elasticsearch:9200';  // change to localhost when running in local system
const indexPattern = 'logstash-*';     // Elasticsearch index pattern | define in fluentd configmap file
const username = 'elastic';  //Elasticsearch username for basic authentication
const password = 'password';  // Elasticsearch password for basic authentication

const client = new elasticsearch.Client({
    host,
    httpAuth: \`\${username}:\${password}\`,
});

const paths = ['/etc/passwd','/.git','/.git/config','sleep','sysdate','config','/.ssh','/.aws','/.config'];

const query = {
  bool: {
    must: [
      {
        range: {
          '@timestamp': {
            gte: 'now-15m',
            lte: 'now',
          },
        },
      },
      {
        bool: {
          should: [
            {
              bool: {
                should: paths.map(path => ({
                  match_phrase: {
                    log: path,
                  },
                })),
              },
            },
            {
              regexp: {
                log: ".*\\\\.php.*"
              }
            },
            {
              regexp: {
                log: ".*\\\\.yaml.*"
              }
            },
          ],
        }
      }
    ],
  },
};

client.search({
    index: indexPattern,
    scroll: '30s',  // how long a consistent view of the index should be maintained
    size: 1000,    // how many hits to return per batch
    body: {
      query,
    },
  }).then(response => {
    console.log(\`Found \${response.hits.total.value} logs:\`);
    const realdata = response.hits.hits.map(data=>{
        return data._source.log;
    });

    async function sendToDiscordWebhook(webhookUrl, data) {
      try {
        // Write data to a temporary file
        const tempFilePath = path.join(__dirname, 'temp.txt');
        fs.writeFileSync(tempFilePath, JSON.stringify(data), 'utf-8');

        // Create a FormData instance
        const formData = new FormData();
        formData.append('content', 'Malicious Logs Files');
        formData.append('file', fs.createReadStream(tempFilePath), 'data.txt');

        // Upload the FormData as a multipart/form-data request to Discord webhook
        const response = await axios.post(webhookUrl, formData, {
          headers: formData.getHeaders()
        });

        console.log(\`Data sent to Discord webhook successfully. Response: \${response.status} \${response.statusText}\`);

        // Delete the temporary file
        fs.unlinkSync(tempFilePath);
        console.log(\`Temporary file deleted: \${tempFilePath}\`);
      } catch (error) {
        console.error(\`Failed to send data to Discord webhook. Error: \${error.message}\`);
      }
    }

    sendToDiscordWebhook(discordWebhookUrl, realdata);

  }).catch(error => {
    console.error(\`Error querying Elasticsearch: \${error}\`);
});
`;

const myText18=`
# Use a node.js base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the code to the container
COPY . .

# Install dependencies
RUN npm install

# Start the application
CMD ["node", "app.js"]
`
const myText19=`
apiVersion: batch/v1
kind: CronJob
metadata:
  name: discord-alerts-cron
spec:
  schedule: "*/15 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: discord-alerts
            image: yourrepo/cronapp:latest
          restartPolicy: OnFailure
`




const HuntHacker = () => {

 return (
    <div>
        <Navbar />

        <div className='BlogpageWrapper'>
            <h1>Hunt The Hacker</h1>
            <p>
            Hello, Folks today’s writeup is about the devsecops project.
            </p>
             <p>
             SIEM — Security Information and Event Management. Tons of platforms who offer this service. but I thought let us create one a customize, simple and inhouse.
            </p>
            <p>
            Insufficient Logging and Monitoring — OWASP introduce this as an Application Risk in 2017.
            </p>
            <p>Security Logging Project :- This project looks like GuardDuty in aws. GuardDuty collect logs from cloudtrail and check for malicious activity and Threat. and also alert the Security Team if any malicious activity is logged.</p>
            <p>I am doing the same thing collecting logs through Fluentd sending these logs to Elasticsearch Server. after that i wrote a script in nodejs which hit the elasticsearch server for malicios logs and alert the team via discord App.</p>
            <p><em>Tools and Tech use — K8s clsuter , nginx-ingress controller , Node-js app deployment , Elasticsearch , Kibana and Fluentd.</em></p>
            <p>This is an Era Of Microservices And Kubernetes so we implementing this Project in Kubernetes — GKE — Google Cloud. All The Cloud services are the same EKS GKE AKS you can use any.</p>
            <p>
                <em>The Most Important part of the Project is Script which hit the elasticsearch api and the query will run in output we will get Malicious logs and then we send these logs to the Discord server via Webhook. you can skip EFK stack deployment if you know how to do that.</em>
            </p>

            <p>Spinn up The Cluster {'>'} get the kubeconfig file {'>'} config the kubectl</p>

            
            <p>1. Set the region in Gcloud command line</p>
            

            <div className='command-div'>
                <pre>{myText1}</pre>
            </div>

            <p>2. Create Cluster using gcloud command line</p>

            <div className='command-div'>
                <pre>{myText2}</pre>
            </div>

            <p>3. configure the kubectl</p>
            <div className='command-div'>
                <pre>{myText2}</pre>
            </div>

            <p>Now Our Cluster is Up and Running you can check this by using this command.</p>
            <p>kubectl get nodes</p>

            <p>2.1 Lets First deploy nginx-ingress controller and Nodejs app as a replicaset</p>
            <p>Nginx-ingress contoller — i think nginx don’t need any introduction it’s popular Reverse Proxy.</p>

            <p> find this document very useful for installtion of ingress 
                <a href='https://kubernetes.github.io/ingress-nginx/deploy/#quick-start' target="_blank">https://kubernetes.github.io/ingress-nginx/deploy/#quick-start</a>
            </p>

            <p>For GKE — Commands</p>

            <div className='command-div'>
                <pre>{myText4}</pre>
            </div>

            <div className='command-div'>
                <pre>{myText5}</pre>
            </div>

            <p>above yaml file will create a namespace called ingress-nginx and will deploy pods and services under that namespace also it will create a Loadbalancer to distribute the load across the apps.</p>
            <div className='command-div'>
                <pre>{myText6}</pre>
            </div>

            <img src={imgOne} />

            <p>you can point out this load balancer ip to your domain name — [ Optional ]</p>
            <p>Now Deploy any Sample app using nginx-ingress — demo yaml file which i use</p>

            <div className='command-div'>
                <pre>{myText7}</pre>
            </div>

            <p>now deploy this App in default namespace</p>

            <div className='command-div'>
                <pre>{myText8}</pre>
            </div>

            <img src={imgTwo} />

            <h3>Deployment of EFK Stack</h3>
            <div className='command-div'>
                <pre>kubectl create namespace kube-logging</pre>
            </div>
            
            <p>we will deploy EFK stack in kube-logging namespace</p>
            <p>Create a Secret for elastic-search and kibana actullay we storing a password here to authenticate a elastisearch api and kibana use this to access the elasticsearch data</p>

            <div className='command-div'>
                <pre>{myText9}</pre>
            </div>

            <p>kubectl apply -f secret.yaml</p>
            <p><em><strong>Elasticsearch is a server where we gather all the logs and process those logs . elastic server create api endpoints
                 for us so we can query the data and can get accurate data as we want.</strong></em>
            </p>

            <p>Now deploy Elasticsearch — first we will deploy the headless elasticsearch service</p>

            <div className='command-div'>
                <pre>{myText10}</pre>
            </div>

            <p>kubectl apply -f es-svc.yaml</p>
            <p>Elasticsearch Server as StatefulSet</p>

            <div className='command-div'>
                <pre>{myText11}</pre>
            </div>

            <p>Kubectl apply -f es-sts.yaml</p>
            <p><em><strong>kibana is a visualization dashboard for elasticsearch. kibana use elastic api to show the data</strong></em></p>
            <p>Now deploy Kibana headless Service</p>

            <div className='command-div'>
                <pre>{myText12}</pre>
            </div>
            <p>kubectl apply -f kib-svc.yaml</p>
            <p>Now Kibana as a deployment</p>

            <div className='command-div'>
                <pre>{myText13}</pre>
            </div>

            <p>kubectl apply -f kibana-deploy.yaml</p>
            <p>Actually, we don’t need kibana as such in this Project. But just to check if everything is working fine we deployed kibana</p>
            <p>
                <em><strong>fluentd — the logg collecter- fluentd is responsible to collect logs from every node and send all the logs to elasticsearch for processing.</strong></em>
            </p>

            <p>manifest files — Service account and role binding to deploy fluend</p>

            <div className='command-div'>
                <pre>{myText14}</pre>
            </div>

            <p>
            kubectl apply -f flueCRB.yaml
            </p>

            <p>ConfigMap for Fluentd</p>
            <div className='command-div'>
                <pre>{myText15}</pre>
            </div>

            <p>kubectl apply -f flucon.yaml
            </p>
            <p>we deploying fluentd as Daemonset. what that mean Daemonset means
                 on every nodes there will be one pod of fluentd which will collect logs.
            </p>

            <div className='command-div'>
                <pre>{myText16}</pre>
            </div>

            <p>We are Done with EFK Stack deployment</p>
            <p>
                <em><strong>The Most Important and Intestering Part Will begin From here</strong></em>
            </p>

            <p>I write a Script in node-js that query the elasticsearch api for the last 15 min logs and by using regex it checks if payloads like Sqli ,LFI , command injection etc are there in logs or not. and the best part of this script is we can customize our payload to check the logs.
                 For example when LOG4j came hackers using the same payloads over all the internet
            </p>

            <div className='command-div'>
                <pre>{myText17}</pre>
            </div>

            <p>lets Understand this script in Parts</p>
            <p> 1. Query the elasticsearch api</p>

            <div className='command-div'>
                <pre>{code}</pre>
            </div>


            <p>
                <em><strong>kubectl port-fortward svc elasticsearch -n kube-logging</strong></em>
            </p>

            <p>i port-forwarded Elasticsearch Service to my Localhost and ran this script to check Output</p>
            <p>node app.js</p>

            <img src={imgThree} />

            <p>
                <em><strong>As you can see in logs i found out someone using sql payloads 
                    to check sql injection attacks in api and parameter. now security team can take action on this.
                </strong></em>

                <p>Now i want to Send these logs to the Discord channel i created Webhook. but webhook has limitation to send the Data. To overcome this Problem i saved all the Logs in temp File sent that temp file as an attachement to my discord wenhook and deleted that temp file right after that</p>
            </p>

            <div className='command-div'>
                <pre>{code1}</pre>
            </div>

            <p>Full Script</p>
            <div className='command-div'>
                <pre>{code2}</pre>
            </div>

            <p>Now I want to run this script in my kubernetes cluster in every 15 minute so it will check for malicious activity and will alert to security team.</p>
            <p>For this we need run Cron job in k8s cluster. before we need docker image to for this script. in that nodejs project create new Dockerfile</p>
            <div className='command-div'>
                <pre>{myText18}</pre>
            </div>
            <p>docker build — platform=linux/arm64 — platform=linux/amd64 -t yourrepo/cronapp:latest .</p>
            <p>docker push yourrepo/cronapp:latest</p>
            <p>Now CronJob</p>
            
            <div className='command-div'>
                <pre>{myText19}</pre>
            </div>

            <div className='command-div'>
                <pre>kubectl apply -f cronapp.yaml -n kube-logging</pre>
            </div>

            <p>you will get alert in every 15 min like this. you can increase time for alert it depends on org.</p>

            <img src={imgFour}/>
            
            <p>You can find all the code here:-</p>
            <a href='https://github.com/Ajaymagar/Hunt-The-Hacker'>https://github.com/Ajaymagar/Hunt-The-Hacker</a>

            <h2>Happy Hacking :))</h2>
        </div>

        <Footer />

        
        

        
    </div>
  )
}

export default HuntHacker