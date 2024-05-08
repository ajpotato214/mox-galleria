/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable no-undef */
import ScryfallCard from "../../model/ScryfallCard";
import Card from "../../model/Card";

describe('ScryfallCard', () => {
  const brainstormMock = {
    "object": "card",
    "id": "beb755c1-9221-480e-bef9-73f1f13a3345",
    "oracle_id": "36cd2364-d113-47d1-b2c4-b088d9eb88dd",
    "multiverse_ids": [
      247331
    ],
    "mtgo_id": 40546,
    "mtgo_foil_id": 40866,
    "tcgplayer_id": 47362,
    "cardmarket_id": 247176,
    "name": "Brainstorm",
    "lang": "en",
    "released_at": "2011-06-17",
    "uri": "https://api.scryfall.com/cards/beb755c1-9221-480e-bef9-73f1f13a3345",
    "scryfall_uri": "https://scryfall.com/card/cmd/40/brainstorm?utm_source=api",
    "layout": "normal",
    "highres_image": true,
    "image_status": "highres_scan",
    "image_uris": {
      "small": "https://cards.scryfall.io/small/front/b/e/beb755c1-9221-480e-bef9-73f1f13a3345.jpg?1592712969",
      "normal": "https://cards.scryfall.io/normal/front/b/e/beb755c1-9221-480e-bef9-73f1f13a3345.jpg?1592712969",
      "large": "https://cards.scryfall.io/large/front/b/e/beb755c1-9221-480e-bef9-73f1f13a3345.jpg?1592712969",
      "png": "https://cards.scryfall.io/png/front/b/e/beb755c1-9221-480e-bef9-73f1f13a3345.png?1592712969",
      "art_crop": "https://cards.scryfall.io/art_crop/front/b/e/beb755c1-9221-480e-bef9-73f1f13a3345.jpg?1592712969",
      "border_crop": "https://cards.scryfall.io/border_crop/front/b/e/beb755c1-9221-480e-bef9-73f1f13a3345.jpg?1592712969"
    },
    "mana_cost": "{U}",
    "cmc": 1.0,
    "type_line": "Instant",
    "oracle_text": "Draw three cards, then put two cards from your hand on top of your library in any order.",
    "colors": [
      "U"
    ],
    "color_identity": [
      "U"
    ],
    "keywords": [],
    "legalities": {
      "standard": "not_legal",
      "future": "not_legal",
      "historic": "banned",
      "timeless": "legal",
      "gladiator": "legal",
      "pioneer": "not_legal",
      "explorer": "not_legal",
      "modern": "not_legal",
      "legacy": "legal",
      "pauper": "legal",
      "vintage": "restricted",
      "penny": "not_legal",
      "commander": "legal",
      "oathbreaker": "legal",
      "standardbrawl": "not_legal",
      "brawl": "legal",
      "alchemy": "not_legal",
      "paupercommander": "legal",
      "duel": "legal",
      "oldschool": "not_legal",
      "premodern": "banned",
      "predh": "legal"
    },
    "games": [
      "paper",
      "mtgo"
    ],
    "reserved": false,
    "foil": false,
    "nonfoil": true,
    "finishes": [
      "nonfoil"
    ],
    "oversized": false,
    "promo": false,
    "reprint": true,
    "variation": false,
    "set_id": "84ff1a64-4e69-4ed2-8c08-26206e3b97a0",
    "set": "cmd",
    "set_name": "Commander 2011",
    "set_type": "commander",
    "set_uri": "https://api.scryfall.com/sets/84ff1a64-4e69-4ed2-8c08-26206e3b97a0",
    "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Acmd&unique=prints",
    "scryfall_set_uri": "https://scryfall.com/sets/cmd?utm_source=api",
    "rulings_uri": "https://api.scryfall.com/cards/beb755c1-9221-480e-bef9-73f1f13a3345/rulings",
    "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A36cd2364-d113-47d1-b2c4-b088d9eb88dd&unique=prints",
    "collector_number": "40",
    "digital": false,
    "rarity": "common",
    "flavor_text": "\"I see more than others do because I know where to look.\"\n—Saprazzan vizier",
    "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
    "artist": "DiTerlizzi",
    "artist_ids": [
      "ed44dce4-30cf-4c2c-b2e1-a19ba2295690"
    ],
    "illustration_id": "a068a944-d5bd-4548-bf16-cf0071ca1f2b",
    "border_color": "black",
    "frame": "2003",
    "full_art": false,
    "textless": false,
    "booster": false,
    "story_spotlight": false,
    "edhrec_rank": 48,
    "penny_rank": 9,
    "prices": {
      "usd": "2.15",
      "usd_foil": null,
      "usd_etched": null,
      "eur": "0.95",
      "eur_foil": null,
      "tix": "0.68"
    },
    "related_uris": {
      "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=247331&printed=false",
      "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DBrainstorm",
      "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DBrainstorm",
      "edhrec": "https://edhrec.com/route/?cc=Brainstorm"
    },
    "purchase_uris": {
      "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F47362%3Fpage%3D1",
      "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Commander/Brainstorm?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
      "cardhoarder": "https://www.cardhoarder.com/cards/40546?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
    }
  };

  test('creates a valid object from valid mock Brainstorm', () => {
    const brainstorm = new ScryfallCard(brainstormMock);

    expect(brainstorm.id).toBe(brainstormMock.id);
    expect(brainstorm.provider).toBe('scryfall');
    expect(brainstorm.metadata.name).toBe('Brainstorm');
  });

  test('fails validation when missing required properties', () => {
    const errorTest = (key) => {
      const brainstormMissingProperties = { ...brainstormMock };

      delete brainstormMissingProperties[key];

      // eslint-disable-next-line no-unused-vars
      const brainstorm = new ScryfallCard(brainstormMissingProperties);
    };

    expect(() => {
      errorTest('object');
    }).toThrow('"object" is required');

    expect(() => {
      errorTest('id');
    }).toThrow('"id" is required');

    expect(() => {
      errorTest('oracle_id');
    }).toThrow('"oracle_id" is required');

    expect(() => {
      errorTest('name');
    }).toThrow('"name" is required');

    expect(() => {
      errorTest('lang');
    }).toThrow('"lang" is required');

    expect(() => {
      errorTest('mana_cost');
    }).toThrow('"mana_cost" is required');

    expect(() => {
      errorTest('cmc');
    }).toThrow('"cmc" is required');

    expect(() => {
      errorTest('oracle_text');
    }).toThrow('"oracle_text" is required');

    expect(() => {
      errorTest('colors');
    }).toThrow('"colors" is required');

    expect(() => {
      errorTest('color_identity');
    }).toThrow('"color_identity" is required');

    expect(() => {
      errorTest('keywords');
    }).toThrow('"keywords" is required');

    expect(() => {
      errorTest('reserved');
    }).toThrow('"reserved" is required');

    expect(() => {
      errorTest('foil');
    }).toThrow('"foil" is required');

    expect(() => {
      errorTest('nonfoil');
    }).toThrow('"nonfoil" is required');

    expect(() => {
      errorTest('finishes');
    }).toThrow('"finishes" is required');

    expect(() => {
      errorTest('set_id');
    }).toThrow('"set_id" is required');

    expect(() => {
      errorTest('set');
    }).toThrow('"set" is required');

    expect(() => {
      errorTest('set_name');
    }).toThrow('"set_name" is required');

    expect(() => {
      errorTest('rarity');
    }).toThrow('"rarity" is required');

    expect(() => {
      errorTest('artist');
    }).toThrow('"artist" is required');

    expect(() => {
      errorTest('artist_ids');
    }).toThrow('"artist_ids" is required');
  });

  test('fails validation when passed a property with mismatched types', () => {
    const errorTest = (key, value) => {
      const brainstormMismatchProperties = { ...brainstormMock };

      brainstormMismatchProperties[key] = value;

      // eslint-disable-next-line no-unused-vars
      const brainstorm = new ScryfallCard(brainstormMismatchProperties);
    };

    expect(() => {
      errorTest('object', 'token');
    }).toThrow('"object" must be [card]');

    expect(() => {
      errorTest('id', '1234');
    }).toThrow('"id" must be a valid GUID');

    expect(() => {
      errorTest('oracle_id', '1234');
    }).toThrow('"oracle_id" must be a valid GUID');

    expect(() => {
      errorTest('name', []);
    }).toThrow('"name" must be a string');

    expect(() => {
      errorTest('lang', []);
    }).toThrow('"lang" must be a string');

    expect(() => {
      errorTest('mana_cost', []);
    }).toThrow('"mana_cost" must be a string');

    expect(() => {
      errorTest('cmc', {});
    }).toThrow('"cmc" must be a number');

    expect(() => {
      errorTest('oracle_text', 1234);
    }).toThrow('"oracle_text" must be a string');

    expect(() => {
      errorTest('colors', 'blue');
    }).toThrow('"colors" must be an array');

    expect(() => {
      errorTest('color_identity', 1234);
    }).toThrow('"color_identity" must be an array');

    expect(() => {
      errorTest('keywords', 'flying');
    }).toThrow('"keywords" must be an array');

    expect(() => {
      errorTest('reserved', '');
    }).toThrow('"reserved" must be a boolean');

    expect(() => {
      errorTest('foil', 'foil');
    }).toThrow('"foil" must be a boolean');

    expect(() => {
      errorTest('nonfoil', 123);
    }).toThrow('"nonfoil" must be a boolean');

    expect(() => {
      errorTest('finishes', 'foil, nonfoil');
    }).toThrow('"finishes" must be an array');

    expect(() => {
      errorTest('set_id', '1234');
    }).toThrow('"set_id" must be a valid GUID');

    expect(() => {
      errorTest('set', 1234);
    }).toThrow('"set" must be a string');

    expect(() => {
      errorTest('set_name', 1234);
    }).toThrow('"set_name" must be a string');

    expect(() => {
      errorTest('rarity', 1234);
    }).toThrow('"rarity" must be a string');

    expect(() => {
      errorTest('artist', 1234);
    }).toThrow('"artist" must be a string');

    expect(() => {
      errorTest('artist_ids', '1234, 5678');
    }).toThrow('"artist_ids" must be an array');

    expect(() => {
      errorTest('flavor_text', []);
    }).toThrow('"flavor_text" must be a string');
  });

  test('creates a valid object of a card without flavor text', () => {
    const brainstormNoFlavorText = { ...brainstormMock };
    delete brainstormNoFlavorText.flavor_text;

    const brainstorm = new ScryfallCard(brainstormNoFlavorText);

    expect(brainstorm.id).toBe(brainstormNoFlavorText.id);
    expect(brainstorm.provider).toBe('scryfall');
    expect(brainstorm.metadata.name).toBe('Brainstorm');
  });

  test('passes parent Card validation', () => {
    const brainstormScryfallCard = new ScryfallCard({ ...brainstormMock });

    Card.validate(brainstormScryfallCard);
  });
});
