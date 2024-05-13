import Joi from 'joi';

export default class Card {
  static validate(cardObject) {
    const cardSchema = Joi.object({
      id: Joi.string().uuid().required(),
      provider: Joi.string().required(),
      metadata: Joi.object().required(),
    });

    const { error, value } = cardSchema.validate(cardObject);

    if (error) {
      throw error;
    }

    return value;
  }

  static deserialize(content) {
    let validCard = content;
    try {
      validCard = JSON.parse(validCard);
    } catch (error) {
      throw new Error('invalid JSON string');
    }

    validCard = Card.validate(validCard);

    return validCard;
  }

  constructor(id, provider, metadata) {
    this.id = id;
    this.provider = provider;
    this.metadata = metadata;

    Card.validate(this);
  }
}
