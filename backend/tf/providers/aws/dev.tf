provider "aws" {
  alias                       = "localstack"
  region                      = "us-west-2"
  skip_region_validation      = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  endpoints {
    dynamodb = "http://localhost:4566"
  }
}

resource "aws_dynamodb_table" "mox_galleria_alters_dev" {
  provider       = aws.localstack
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

resource "aws_dynamodb_table" "mox_galleria_cards_dev" {
  provider       = aws.localstack
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