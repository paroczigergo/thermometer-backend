variable "vercel_api_token" {
  type = string
}

variable "repo" {
  type = string
}

variable "MONGODB_URI" {
  type = string
}

variable "DB_NAME" {
  type = string
  default = "thermometer"
}

variable "WEATHER_API_KEY" {
  type = string
}

variable "WEATHER_LOCATION" {
  type = string
}

variable "WEATHER_URL" {
  type = string
}

variable "THERMOMETER_CLIENT_KEY" {
  type = string
}

variable "GOOGLE_ID" {
  type = string
}

variable "GOOGLE_SECRET" {
  type = string
}

variable "NEXT_PUBLIC_CLIENT_ID" {
  type = string
}

variable "NEXTAUTH_SECRET" {
  type = string
}


variable "ATLAS_PUBLIC_KEY" {
  type = string
}


variable "ATLAS_PRIVATE_KEY" {
  type = string
}

variable "ATLAS_ORG_ID" {
  type = string
}

variable "ATLAS_DB_USER_NAME" {
  type = string
}

variable "ATLAS_DB_USER_PASSWORD" {
  type = string
}

variable "ATLAS_ACCESS_IP" {
  type = string
  default = "0.0.0.0"
}

variable "ATLAS_PROJECT_NAME" {
  type = string
  default = "ThermometerProject"
}

variable "ATLAS_CLUSTER_NAME" {
  type = string
  default = "ThermometerCluster"
}

variable "ATLAS_PROVIDER_NAME" {
  type = string
  default = "AWS"
}

variable "ATLAS_PROVIDER_REGION_NAME" {
  type = string
  default = "EU_CENTRAL_1"
}

variable "ATLAS_PROVIDER_SIZE" {
  type = string
  default = "0"
}

variable "TF_LOG" {
  type = string
}