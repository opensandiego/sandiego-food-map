# Install, Build, and Run Application

**Note:** Assumes Command Line Interface usage.
### Pre-requisites
1. *npm* installed
2. [San Diego Food Map](https://github.com/opensandiego/sandiego-food-map.git) repository cloned to your local development system.
3. Access to [San Diego Food Map](https://github.com/opensandiego/sandiego-food-map.git) project on GitHub.

## Build application
1.  On your local development system, from within your cloned repository root directory issue an `npm -g install` to install packages globally.  Any packages listed in the repository *local* package.json that are not installed should be installed.  Packages that need to be manually updated should normally be flagged as **WARN** in the output.  Issue an  `npm update <package name_version>` to update the packages.
2. After installation and potential package update, issue an `npm start` to build and start the app.  Upon successful build and start, you should expect similar output:
~~~
> san_diego_food_map@1.0.0 start <your start directory>/sandiego-food-map
> webpack-dev-server --host 0.0.0.0 --port 8080 --config ./webpack.config.js --mode development

ℹ ｢wds｣: Project is running at http://0.0.0.0:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from <your start directory>/sandiego-food-map/dist
ℹ ｢wds｣: 404s will fallback to /index.html
~~~
At this point application has been started, and output messages will be logged to stdout (usually your screen). 

3. From your browser go the the URL the project is running, in above case http://0.0.0.0:0000
## Docker
Pre-requesites
1. [Docker Engine](https://docs.docker.com/engine/) - Installed in your local development environment, e.g. [Install Docker Engine](https://docs.docker.com/engine/install/)
2. [Docker Compose](https://docs.docker.com/compose/) - Compose installed in your local environment, e.g. [Install Compose](https://docs.docker.com/compose/install/)
3. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) - AWS CLI installed in your local enviornment, e.g. [Installing the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
   
## Docker Compose file
**Note**: Updated build and run instructions may be documented inside the *Dockerfile.lambda*
1. The Dockerfile for building the  lambda function zip file is called *Dockerfile.lambda*.  See [Using a Dockerfile to Build](https://github.com/lambci/docker-lambda#using-a-dockerfile-to-build)
2.  To build the lambda function locally use `docker build -t sandiego-food-map-lambda -f Dockerfile.lambda .`
**Note**: Depending on your local development system cpu/memory this `docker build` command may take "a while", as images are built or pulled down from Docker site.
3.  To run as test without sending the result to AWS S3 (just prints to console) `docker run -v $PWD/data:/var/task/data -it sandiego-food-map-lambda python lambda_function.py `
