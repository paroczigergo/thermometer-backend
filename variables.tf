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