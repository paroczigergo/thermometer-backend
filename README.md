This is a thermometer API and dashboard component to interact with a [Thermometer Client](https://github.com/paroczigergo/thermometer).
It also contains different deployment options and configurations: Docker, Docker Compose, Terraform, Vercel, Mongodb Atlas, Github Actions

My main goal was to try out deployment options and also create a [Next.js](https://nextjs.org/) baseds cloud component for the existing [Thermometer Client](https://github.com/paroczigergo/thermometer which can be installed and run on Raspberry Pi with an Arduino board and a temperature/humidity sensor.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration
There is no environmental separation in this project, just an `.env` file which can be created from `.env.example`

## Deployment

### Terraform
This option is using Vercel to deploy the web and API components and using Mongodb Atlas for database. For the sake of simplicity I use the same repository to store the terraform config file, but normally it should be in a separated one.

#### Requirements
- Terraform CLI
- Vercel account
#### Steps
- create Vercel access token with `Full Access`
- run `terraform init`


### Github actions
This is not a standalone deployment. It uses the terraform deployment with the Github CI/CD pipeline.

#### Requirements
- Github account
- code should be in Github
- Terraform Cloud user

#### Steps
- create Terraform Cloud user API token
- save it to `TF_API_TOKEN` under github repository's secrets

### Local Docker Compose
This option is only for testing the components locally with Docker and Docker compose.

#### Requirements
- installed Docker Hub
