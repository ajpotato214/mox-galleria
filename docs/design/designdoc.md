# Summary
Mox Galleria is a website that showcases Magic: The Gathering alters and signed cards from the personal collection of Andy Papa.

**Author: Andy Papa**  
**Created:** 04/26/2024 **Last Updated:** 04/27/2024

# Background
The MTG alter and signed card community is a relatively small and niche community with an online presence in various subreddits, Discord channels, and Facebook groups. It is often cumbersome to post pictures of my collection in these online groups because posts are generally unorganized and can get burried over time due to the linear nature. I also feel alters and signed cards should have consistent, high quality scans rather than photos taken from mobile phones of varying quality. 

The goal is to create a website that showcases my personal collection in _one_ place with high quality scans and other useful card metadata.

# Glossary
- **Alter** - A collectibe trading card that has been artisitcally altered or customized by an artist, usually hand painted or hand drawn
- **Gatherer** - The official Magic: The Gathering card database hosted by Wizards of the Coast
- **MTG** - abbreviation for Magic: The Gathering
- **Playset** - 4 of the same card is colloquially known as a "playset". In Magic: The Gathering 60 card formats, players are only allowed 4 of the same card in decks. 
- **Scryfall** - A community run Magic: The Gathering search website with a powerful search syntax
- **Signed Card** - A collectible trading card that has been autographed by the original artist or other noteworthy person

# High-Level Requirements
More granular requirements such as use cases and user stories will be managed via a more robust tracking system such as Trello or Jira with a link to be provided at a later date.

## Functional Requirements
1. A user should be able to view the collection via various view styles including: Gallery view, List view, Magazine View.
2. A user that clicks on a an alter or signed card should be redirected to a detailed product page for the card.
3. The detailed product page for a card should contain: 
    - Additional photos if available
    - Card metadata (set, number, rarity, card text, original artist, etc)
    - Condition
    - Alter artist name
    - Who the card is signed by
    - If the card is available for trade or sale
    - Additional notes
4. Users should be able to search for cards via a search box.


## Non-Functional Requirements
1. Card metadata should be sourced from a reliable and trustworthy source such as Scryfall or Gatherer.

## Extended Requirements
1. Implement Scryfall search syntax
2. Implement search box autocomplete

# High-Level Design
## Database and Schema Design
As it currently stands, the magnitude of my collection is less than 100, a rather trivial amount for any DBMS to store. In my lifetime, I do not forsee crossing a ceiling of single-digit _thousands_ of alters and signed cards (if I did, I would likely have bigger problems than showcasing my collection online).

For the sake of simplicity and speed, data will be stored in a structured JSON for each card on managed DynamoDB tables hosted on AWS.

Proposed DynamoDB Table Schema:

```
{
    "TableName": "mox_galleria",
      "KeyAttributes": {
        "PartitionKey": {
          "AttributeName": "set_id",
          "AttributeType": "N"
        },
        "SortKey": {
          "AttributeName": "card_id",
          "AttributeType": "S"
        }
      },
      "NonKeyAttributes": [
        {
          "AttributeName": "scryfall_id",
          "AttributeType": "S"
        },
        {
          "AttributeName": "card_name",
          "AttributeType": "S"
        },
        {
          "AttributeName": "collection_name",
          "AttributeType": "S"
        },
        {
          "AttributeName": "alter_artist",
          "AttributeType": "S"
        },
        {
          "AttributeName": "commission_date",
          "AttributeType": "N"
        },
        {
          "AttributeName": "signed_by",
          "AttributeType": "S"
        },
        {
          "AttributeName": "signed_date",
          "AttributeType": "N"
        },
        {
          "AttributeName": "condition",
          "AttributeType": "S"
        },
        {
          "AttributeName": "for_sale",
          "AttributeType": "BOOL"
        },
        {
          "AttributeName": "for_trade",
          "AttributeType": "BOOL"
        },
        {
          "AttributeName": "notes",
          "AttributeType": "S"
        }
      ]
}
```

The **partition key** and **sort key** were selected to ensure playsets of alters and signed cards are stored on the same partition. I typically commission artist a playset at a time as well as approach original artist for signatures at cons with playsets. The playset view will be a primary drill down view for a user browsing as a playset tells the whole story of an artist's vision or the moment they signed the cards. This will ensure read optimization.

Here is an example item of my very first commissioned Brainstorm alter:

```
{
    "set_id": 1, // partition key
    "card_id": "018f27f1-6558-7d50-9287-c6223f74683c", // sort key
    "scryfall_id": "beb755c1-9221-480e-bef9-73f1f13a3345",
    "card_name": "Brainstorm",
    "collection_name": "Cantrip Cartel",
    "alter_artist": "GK Alters",
    "commission_date": 1682985600,
    "signed_by": null,
    "signed_date": null,
    "condition": "LP",
    "for_sale": false,
    "for_trade": false,
    "notes": "My very first comissioned alter",
}
```

## Scryfall Data
Scryfall returns a wealth of data for every card in MTG's history. Again here is an example of what the Scryfall REST API returns for my very first commissioned alter, [Brainstorm from the Commander 2011 set](https://api.scryfall.com/cards/cmd/40/). 

Mox Galleria will integrate with its REST API as a trustworthy and authoratative source of card metadata.

Scryfall also conveniently host [bulk data files](https://scryfall.com/docs/api/bulk-data) of its _entire_ database. Considerations were made for hosting the entirety of MTG's card library locally, but is likely unnecessary; instead, coresponding Scryfall card metadata for each of the alters and signed cards will be inserted along with Mox Galleria data at _insertion time_.

Proposed DynamoDB Table Schema:
```
{
      "TableName": "scryfall",
      "KeyAttributes": {
        "PartitionKey": {
          "AttributeName": "scryfall_id",
          "AttributeType": "S"
        }
      },
      "NonKeyAttributes": [
        {
          "AttributeName": "metadata",
          "AttributeType": "M"
        }
      ]
}
```

The entirety of Scryfall's metadata will be captured per card in order to maximize implementing Scryfall's keyword and expressions search syntax.