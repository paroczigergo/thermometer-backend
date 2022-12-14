terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.11.2"
    }
  }
}

provider "vercel" {
  # Or omit this for the api_token to be read
  # from the VERCEL_API_TOKEN environment variable
  api_token = var.vercel_api_token
}

# Vercel Github integration
resource "vercel_project" "thermometer" {
  name      = "terraform-thermometer-backend"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = var.repo
  }
  environment = [
    {
      key    = "MONGODB_URI"
      value  = var.MONGODB_URI
      target = ["production"]
    },
    {
      key    = "DB_NAME"
      value  = var.DB_NAME
      target = ["production"]

    },
    {
      key    = "WEATHER_API_KEY"
      value  = var.WEATHER_API_KEY
      target = ["production"]

    },
    {
      key    = "WEATHER_LOCATION"
      value  = var.WEATHER_LOCATION
      target = ["production"]

    },
    {
      key    = "WEATHER_URL"
      value  = var.WEATHER_URL
      target = ["production"]

    },
    {
      key    = "THERMOMETER_CLIENT_KEY"
      value  = var.THERMOMETER_CLIENT_KEY
      target = ["production"]

    },
    {
      key    = "GOOGLE_ID"
      value  = var.GOOGLE_ID
      target = ["production"]

    },
    {
      key    = "GOOGLE_SECRET"
      value  = var.GOOGLE_SECRET
      target = ["production"]

    },
    {
      key    = "NEXT_PUBLIC_CLIENT_ID"
      value  = var.NEXT_PUBLIC_CLIENT_ID
      target = ["production"]

    }
  ]
}

