/* eslint-disable import/prefer-default-export */
import Alter from '../model/Alter';
import AlterRepository from '../repository/AlterRepository';

const { MOX_GALLERIA_MTG_ALTERS_TABLE, REGION } = process.env;

const response = (statusCode, body, headers = {}, isBase64Encoded = false) => ({
  isBase64Encoded,
  statusCode,
  headers,
  body,
});

export const addMtgAlter = async (event) => {
  let alter = event.body;

  try {
    alter = Alter.deserialize(alter);
  } catch (error) {
    return response(400, error.message);
  }

  const db = new AlterRepository(MOX_GALLERIA_MTG_ALTERS_TABLE, REGION);

  const added = await db.add(
    alter.id,
    alter.card_id,
    alter.card_name,
    alter.alter_artist,
    alter.condition,
    alter.status,
    alter.signed_by,
  );

  return response(added.$metadata.httpStatusCode, `Successfully added Alter card: ${alter.card_name} with id ${alter.id}`);
};
