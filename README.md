# Termometer dashboard

This is a thermometer API and dashboard component to show indoor and outdoot temperature and humidity values.
It also contains different deployment options and configurations: Docker, Docker Compose, Terraform, Vercel, Mongodb Atlas, Github Actions

My main goal was to try out deployment options and also create a [Next.js](https://nextjs.org/) based cloud component for storing and providing weater data from an external API and from a internal client which can be installed and run on a Raspberry Pi ([Thermometer Client](https://github.com/paroczigergo/thermometer))

## Functions

- Google authentication 
- Save sensor data
    - it merges the incoming indoor data with an external outdoor data and save it to a mongodb database
- Listing the last 50 temperature data
- Show saved items on a line chart
- Mock sendor data saving with the `mock=true` query param

## Configuration
Locally there is no environmental separation in this project, just an `.env` file which can be created from `.env.example`

### Requirements
- weatherapi.com account
    - generate an api key
- google cloud account
    - generated OAuth 2.0 Client id and secret
- existed mongodb connection uri
    - this can be generated through deployments as well
- a generated secret token for `NEXTAUTH_SECRET` from `openssl rand -base64 32` or using https://generate-secret.vercel.app/32

## Development

Run the development server:

```bash
$ yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### With Terraform
This option is using Vercel to deploy the web and API components and using Mongodb Atlas for database. For the sake of simplicity I use the same repository to store the terraform config file, but normally it should be in a separated project.

#### Requirements
- Terraform CLI
- Vercel account
- Mongodb Atlas account
#### Steps
- create Vercel access token with `Full Access`
- create an organization and programmatic API key for mongodb Atlas
- create a `production.tfvars` file from `production.tfvars.example`
    - fill all variables based on the `.env` file
    - `MONGODB_URI` will be created during the deploy, later you can copy it from the terminal or from the tfstate file
- run `yarn run terraform:init`
- run `yarn run terraform:plan:production`
- run `yarn run terraform:apply:production`
- commit a change to trigger the deploy
- check out the deployment on https://vercel.com/dashboard

#### Destroy
- run `yarn run terraform:destroy:production`

### With Docker Compose
This option is only for testing the components locally with Docker and Docker compose.

#### Requirements
- installed Docker Hub

#### Steps
- run Docker Hub
- run `yarn run compose:up`

#### Destroy
- run `yarn run compose:down`


### With Github actions (not implemented)
This is not a standalone deployment option. It uses the terraform deployment with the Github CI/CD pipeline.

#### Considerations
- It is all about where to manage the terraform states and variables.
- Terraform Cloud offers an easy and straight forward way to do it, but it can be pricy and the variables has to be typed manually which is not ideal.
- On the other hand we can also store states and variables in a private S3 bucket, which keeps the state file synced and also give us the flexibility to use variable files. It maybe requires more configuration in the begining but it will provide more scaleability 

#### Requirements
- Github account
- code should be in Github
- Terraform Cloud user or an AWS user with an S3 bucket

#### Terraform Cloud Steps
- create Terraform Cloud user API token
- save it to `TF_API_TOKEN` under github repository's secrets
- todo

#### AWS S3 Steps
- todo
