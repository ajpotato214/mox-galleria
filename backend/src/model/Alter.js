import Joi from 'joi';

export default class Alter {
  static validate(alterObject) {
    const alterSchema = Joi.object({
      id: Joi.number().required(),
      card_id: Joi.string().uuid().required(),
      card_name: Joi.string().required(),
      alter_artist: Joi.string().required(),
      condition: Joi.string().valid('NM', 'LP', 'MP', 'HP', 'DMG').required(),
      status: Joi.string()
        .valid(
          'NOT_FOR_SALE_TRADE',
          'FOR_SALE_TRADE',
          'FOR_SALE',
          'FOR_TRADE',
          'SOLD',
          'TRADED',
          'LOST',
          'GIFT',
        )
        .required(),
      signed_by: Joi.string().allow(null),
      playset: Joi.array(),
    });

    const { error, value } = alterSchema.validate(alterObject);

    if (error) {
      throw error;
    }

    return value;
  }

  static deserialize(content) {
    let validAlter = content;
    try {
      validAlter = JSON.parse(validAlter);
    } catch (error) {
      throw new Error('invalid JSON string');
    }

    validAlter = Alter.validate(validAlter);

    return validAlter;
  }

  constructor(
    id,
    cardId,
    cardName,
    alterArtist,
    condition,
    status,
    signedBy = null,
  ) {
    this.id = id;
    this.card_id = cardId;
    this.card_name = cardName;
    this.alter_artist = alterArtist;
    this.condition = condition;
    this.status = status;
    this.signed_by = signedBy || null;

    Alter.validate(this);
  }
}
