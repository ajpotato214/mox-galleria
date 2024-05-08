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
  region                   = "us-west-2"
  shared_credentials_files = ["$HOME/.aws/credentials"]
  profile                  = "mox-galleria-deploy"
}

resource "aws_dynamodb_table" "mox_galleria_alters" {
  name           = "mox_galleria_alters"
  billing_mode   = "PROVISIONED"
  read_capacity  = "1"
  write_capacity = "1"
  hash_key       = "alter_id"

  attribute {
    name = "alter_id"
    type = "N"
  }
}

resource "aws_dynamodb_table" "mox_galleria_cards" {
  name           = "mox_galleria_cards"
  billing_mode   = "PROVISIONED"
  read_capacity  = "1"
  write_capacity = "1"
  hash_key       = "card_id"

  attribute {
    name = "card_id"
    type = "S"
  }
}