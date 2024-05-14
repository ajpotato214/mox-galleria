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

resource "aws_dynamodb_table" "mox_galleria_mtg_alters" {
  name           = "mox_galleria_mtg_alters"
  billing_mode   = "PROVISIONED"
  read_capacity  = "1"
  write_capacity = "1"
  hash_key       = "alter_id"

  attribute {
    name = "alter_id"
    type = "N"
  }
}

resource "aws_dynamodb_table" "mox_galleria_mtg_cards" {
  name           = "mox_galleria_mtg_cards"
  billing_mode   = "PROVISIONED"
  read_capacity  = "1"
  write_capacity = "1"
  hash_key       = "card_id"

  attribute {
    name = "card_id"
    type = "S"
  }
}

resource "aws_s3_bucket" "mox-galleria-mtg-alters" {
  bucket = "mox-galleria-mtg-alters"
}

resource "aws_s3_bucket_public_access_block" "mox-galleria-mtg-alters" {
  bucket                  = aws_s3_bucket.mox-galleria-mtg-alters.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "open_access" {
  bucket = aws_s3_bucket.mox-galleria-mtg-alters.id

  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "Public_access"
    Statement = [
      {
        Sid = "IPAllow"
        Effect = "Allow"
        Principal = "*"
        Action = ["s3:GetObject"]
        Resource = "${aws_s3_bucket.mox-galleria-mtg-alters.arn}/*"
      },
    ]
  })
  depends_on = [ aws_s3_bucket_public_access_block.mox-galleria-mtg-alters ]
}
