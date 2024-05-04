terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-west-2"
  shared_credentials_files = ["$HOME/.aws/credentials"]
  profile = "mox-galleria-deploy"
}

resource "aws_dynamodb_table" "mox_galleria_alters" {
  name         = "mox_galleria_alters"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "alter_id"

  attribute {
    name = "alter_id"
    type = "N"
  }
}

resource "aws_dynamodb_table" "mox_galleria_scryfall" {
  name = "mox_galleria_scryfall"
  billing_mode = "PAY_PER_REQUEST"
  hash_key = "scryfall_id"

  attribute {
    name = "scryfall_id"
    type = "S"
  }
}