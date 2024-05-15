import Joi from 'joi';
import Card from './Card';

export default class ScryfallCard extends Card {
  static validate(scryfallCardObject = {}) {
    const metadataSchema = Joi.object({
      object: Joi.string().equal('card').required(),
      id: Joi.string().uuid().required(),
      oracle_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      lang: Joi.string().required(),
      mana_cost: Joi.string().allow('').required(),
      cmc: Joi.number().required(),
      oracle_text: Joi.string().required(),
      colors: Joi.array().required(),
      color_identity: Joi.array().required(),
      keywords: Joi.array().required(),
      reserved: Joi.bool().required(),
      foil: Joi.bool().required(),
      nonfoil: Joi.bool().required(),
      finishes: Joi.array().required(),
      set_id: Joi.string().uuid().required(),
      set: Joi.string().required(),
      set_name: Joi.string().required(),
      rarity: Joi.string().required(),
      artist: Joi.string().required(),
      artist_ids: Joi.array().required(),
      flavor_text: Joi.string(),
    }).options({ allowUnknown: true });

    const { error } = metadataSchema.validate(scryfallCardObject.metadata);

    if (error) {
      throw error;
    }

    return scryfallCardObject;
  }

  constructor(metadata) {
    super(metadata.id, 'scryfall', metadata);

    this.metadata = metadata;

    ScryfallCard.validate(this);
  }
}
