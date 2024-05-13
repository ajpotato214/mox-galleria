/* eslint-disable import/prefer-default-export */
import Card from '../model/Card';
import ScryfallCard from '../model/ScryfallCard';
import CardRepository from '../repository/CardRepository';

const { MOX_GALLERIA_MTG_CARDS_TABLE, REGION } = process.env;

const response = (statusCode, body, headers = {}, isBase64Encoded = false) => ({
  isBase64Encoded,
  statusCode,
  headers,
  body,
});

const addScryfallCard = async (card) => {
  let scryfallCard = {};

  try {
    scryfallCard = new ScryfallCard(card.metadata);
  } catch (error) {
    return response(400, `Invalid Scryfall card: ${error.message}`);
  }

  const db = new CardRepository(MOX_GALLERIA_MTG_CARDS_TABLE, REGION);

  const added = await db.add(scryfallCard.id, scryfallCard.provider, scryfallCard.metadata);

  return response(added.$metadata.httpStatusCode, `Successfully added Scryfall card: ${scryfallCard.metadata.name}`);
};

export const addCard = async (event) => {
  let card = event.body;

  try {
    card = Card.deserialize(card);
  } catch (error) {
    return response(400, error.message);
  }

  switch (card.provider) {
    case 'scryfall': {
      return addScryfallCard(card);
    }
    default: {
      return response(
        400,
        `Unrecognized or unsupported card provider: ${card.provider}`,
      );
    }
  }
};
