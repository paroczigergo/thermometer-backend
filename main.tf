terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.11.2"
    }

     mongodbatlas = {
      source = "mongodb/mongodbatlas"
    }
  }
}

provider "vercel" {
  # Or omit this for the api_token to be read
  # from the VERCEL_API_TOKEN environment variable
  api_token = var.vercel_api_token
}

# Configure Vercel Github integration
resource "vercel_project" "thermometer" {
  name      = "terraform-thermometer-backend"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = var.repo
    production_branch = "develop"
  }
  environment = [
    {
      key    = "MONGODB_URI"
      value  = "mongodb+srv://${var.ATLAS_DB_USER_NAME}:${var.ATLAS_DB_USER_PASSWORD}@${split("mongodb+srv://",mongodbatlas_cluster.my_cluster.connection_strings.0.standard_srv)[1]}/?retryWrites=true&w=majority"
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

    },
    {
      key    = "NEXTAUTH_SECRET"
      value  = var.NEXTAUTH_SECRET
      target = ["production"]

    }
  ]
  depends_on = [
    mongodbatlas_cluster.my_cluster
  ]
}


locals {
  mongodb_atlas_api_pub_key            = var.ATLAS_PUBLIC_KEY
  mongodb_atlas_api_pri_key            = var.ATLAS_PRIVATE_KEY
  mongodb_atlas_org_id                 = var.ATLAS_ORG_ID
  mongodb_atlas_database_username      = var.ATLAS_DB_USER_NAME
  mongodb_atlas_database_user_password = var.ATLAS_DB_USER_PASSWORD
  mongodb_atlas_accesslistip           = var.ATLAS_ACCESS_IP
}

provider "mongodbatlas" {
  public_key  = local.mongodb_atlas_api_pub_key
  private_key = local.mongodb_atlas_api_pri_key
}

#
# Create a Project
#
resource "mongodbatlas_project" "my_project" {
  name   = var.ATLAS_PROJECT_NAME
  org_id = local.mongodb_atlas_org_id
}

#
# Create a Shared Tier Cluster
#
resource "mongodbatlas_cluster" "my_cluster" {
  project_id = mongodbatlas_project.my_project.id
  name       = var.ATLAS_CLUSTER_NAME

  # Provider Settings "block"
  provider_name = "TENANT"
  backing_provider_name       = var.ATLAS_PROVIDER_NAME
  # topic: https://github.com/mongodb/terraform-provider-mongodbatlas/issues/160#issuecomment-594006265

  provider_region_name = var.ATLAS_PROVIDER_REGION_NAME

  provider_instance_size_name = var.ATLAS_PROVIDER_SIZE

  # mongo_db_major_version       = "5.0"
  auto_scaling_disk_gb_enabled = "false"
}

#
# Create an Atlas Admin Database User
#
resource "mongodbatlas_database_user" "my_user" {
  username           = local.mongodb_atlas_database_username
  password           = local.mongodb_atlas_database_user_password
  project_id         = mongodbatlas_project.my_project.id
  auth_database_name = "admin"

  roles {
    role_name     = "atlasAdmin"
    database_name = "admin"
  }
}

resource "mongodbatlas_project_ip_access_list" "my_ipaddress" {
  project_id = mongodbatlas_project.my_project.id
  cidr_block = local.mongodb_atlas_accesslistip
  comment    = "Terraform deploy ip address"
  depends_on = [
    mongodbatlas_cluster.my_cluster,
    mongodbatlas_project.my_project
  ]
}

# Use terraform output to display connection strings.
output "connection_strings" {
  value = mongodbatlas_cluster.my_cluster.connection_strings.0.standard_srv
}
