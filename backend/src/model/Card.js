import Joi from 'joi';

export default class Card {
  static validate(cardObject) {
    const cardSchema = Joi.object({
      id: Joi.string().uuid().required(),
      provider: Joi.string().required(),
      metadata: Joi.object().required(),
    });

    const { error, validCard } = cardSchema.validate(cardObject);

    if (error) {
      throw error;
    }

    return validCard;
  }

  constructor(id, provider, metadata = {}) {
    this.id = id;
    this.provider = provider;
    this.metadata = metadata;

    Card.validate(this);
  }
}
