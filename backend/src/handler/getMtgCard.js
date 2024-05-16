/* eslint-disable import/prefer-default-export */
import CardRepository from '../repository/CardRepository';

const { MOX_GALLERIA_MTG_CARDS_TABLE, REGION } = process.env;

const response = (statusCode, body, headers = {}, isBase64Encoded = false) => ({
  isBase64Encoded,
  statusCode,
  headers,
  body: JSON.stringify(body),
});

export const getMtgCard = async (event) => {
  const targetCard = event.pathParameters.id;

  const db = new CardRepository(MOX_GALLERIA_MTG_CARDS_TABLE, REGION);

  const found = await db.findOne(targetCard);

  if (found) {
    return response(200, found);
  }

  return response(404, `Could not find card with ID ${targetCard}`);
};
