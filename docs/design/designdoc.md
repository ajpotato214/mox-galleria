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
- **Scryfall** - A community run Magic: The Gathering search website
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
## Schema Design

```
{
    "set_id": 1, // partition key
    "card_id": "018f27f1-6558-7d50-9287-c6223f74683c", // sort key
    "collection_name": "Cantrip Cartel",
    "alter_artist": "GK Alters",
    "signed_by": null,
    "condition": "LP",
    "for_sale": false,
    "for_trade": false,
    "notes": "My very first comissioned alter",
    "scryfall": {
        ... // sourced Scryfall data
    }
}
```