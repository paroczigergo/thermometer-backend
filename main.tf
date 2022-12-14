terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "0.11.2"
    }
  }
}

resource "vercel_project" "thermometer" {
  name      = "terraform-thermometer-backend"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "paroczigergo/thermometer-backend"
    production_branch = "deployment-wiring"
  }
}