/* eslint-disable no-undef */
import Alter from '../../model/Alter';

describe('Alter', () => {
  const alterMock = {
    id: 1,
    card_id: 'beb755c1-9221-480e-bef9-73f1f13a3345',
    card_name: 'Brainstorm',
    alter_artist: 'GK Alters',
    condition: 'LP',
    status: 'NOT_FOR_SALE_TRADE',
    signed_by: 'Richard Garfield',
    playset: [1, 2, 3, 4],
  };

  test('creates a valid Alter object from a valid mock', () => {
    const alter = new Alter(
      alterMock.id,
      alterMock.card_id,
      alterMock.card_name,
      alterMock.alter_artist,
      alterMock.condition,
      alterMock.status,
      alterMock.signed_by,
      alterMock.playset,
    );

    expect(alter.id).toBe(1);
    expect(alter.card_id).toBe('beb755c1-9221-480e-bef9-73f1f13a3345');
    expect(alter.card_name).toBe('Brainstorm');
    expect(alter.alter_artist).toBe('GK Alters');
    expect(alter.condition).toBe('LP');
    expect(alter.status).toBe('NOT_FOR_SALE_TRADE');
  });

  test('fails validation when missing required properties', () => {
    const errorTest = (key) => {
      const alter = new Alter(
        alterMock.id,
        alterMock.card_id,
        alterMock.card_name,
        alterMock.alter_artist,
        alterMock.condition,
        alterMock.status,
      );

      const alterMissingProp = { ...alter };

      delete alterMissingProp[key];

      Alter.validate(alterMissingProp);
    };

    expect(() => {
      errorTest('id');
    }).toThrow('"id" is required');

    expect(() => {
      errorTest('card_id');
    }).toThrow('"card_id" is required');

    expect(() => {
      errorTest('card_name');
    }).toThrow('"card_name" is required');

    expect(() => {
      errorTest('alter_artist');
    }).toThrow('"alter_artist" is required');

    expect(() => {
      errorTest('condition');
    }).toThrow('"condition" is required');

    expect(() => {
      errorTest('status');
    }).toThrow('"status" is required');
  });

  test('fails validation when mismatched types', () => {
    const errorTest = (key, value) => {
      const alter = new Alter(
        alterMock.id,
        alterMock.card_id,
        alterMock.card_name,
        alterMock.alter_artist,
        alterMock.condition,
        alterMock.status,
      );

      const alterMismatchProp = { ...alter };

      alterMismatchProp[key] = value;

      Alter.validate(alterMismatchProp);
    };

    expect(() => {
      errorTest('id', 'asdfsdaf');
    }).toThrow('"id" must be a number');

    expect(() => {
      errorTest('card_id', '1234');
    }).toThrow('"card_id" must be a valid GUID');

    expect(() => {
      errorTest('card_name', 1234);
    }).toThrow('"card_name" must be a string');

    expect(() => {
      errorTest('alter_artist', 1234);
    }).toThrow('"alter_artist" must be a string');

    expect(() => {
      errorTest('condition', 1234);
    }).toThrow('"condition" must be one of [NM, LP, MP, HP, DMG]');

    expect(() => {
      errorTest('status', 1234);
    }).toThrow(
      '"status" must be one of [NOT_FOR_SALE_TRADE, FOR_SALE_TRADE, FOR_SALE, FOR_TRADE, SOLD, TRADED, LOST, GIFT]',
    );

    expect(() => {
      errorTest('signed_by', 1234);
    }).toThrow('"signed_by" must be a string');

    expect(() => {
      errorTest('playset', {});
    }).toThrow('"playset" must be an array');
  });

  test('deserializes a valid escaped Alter object string', () => {
    const alterObjectStringMock = JSON.stringify(alterMock);
    const alter = Alter.deserialize(alterObjectStringMock);

    expect(alter.id).toBe(1);
    expect(alter.card_id).toBe('beb755c1-9221-480e-bef9-73f1f13a3345');
    expect(alter.card_name).toBe('Brainstorm');
    expect(alter.alter_artist).toBe('GK Alters');
    expect(alter.condition).toBe('LP');
    expect(alter.status).toBe('NOT_FOR_SALE_TRADE');
    expect(alter.signed_by).toBe('Richard Garfield');
    expect(alter.playset).toStrictEqual([1, 2, 3, 4]);
  });

  test('fails to deserialize a malformed JSON Object string', () => {
    const alterObjectStringMock = '{This is a malformed JSON}';

    expect(() => {
      Alter.deserialize(alterObjectStringMock);
    }).toThrow('invalid JSON string');
  });

  test('fails to deserialize an alter JSON Object string with a missing required property', () => {
    const errorTest = (key) => {
      const alter = new Alter(
        alterMock.id,
        alterMock.card_id,
        alterMock.card_name,
        alterMock.alter_artist,
        alterMock.condition,
        alterMock.status,
      );

      const alterMissingProp = { ...alter };

      delete alterMissingProp[key];

      Alter.deserialize(JSON.stringify(alterMissingProp));
    };

    expect(() => {
      errorTest('id');
    }).toThrow('"id" is required');

    expect(() => {
      errorTest('card_id');
    }).toThrow('"card_id" is required');

    expect(() => {
      errorTest('card_name');
    }).toThrow('"card_name" is required');

    expect(() => {
      errorTest('alter_artist');
    }).toThrow('"alter_artist" is required');

    expect(() => {
      errorTest('condition');
    }).toThrow('"condition" is required');

    expect(() => {
      errorTest('status');
    }).toThrow('"status" is required');
  });

  test('fails to deserialize an alter JSON object string with mismatched types', () => {
    const errorTest = (key, value) => {
      const alter = new Alter(
        alterMock.id,
        alterMock.card_id,
        alterMock.card_name,
        alterMock.alter_artist,
        alterMock.condition,
        alterMock.status,
      );

      const alterMismatchProp = { ...alter };

      alterMismatchProp[key] = value;

      Alter.deserialize(JSON.stringify(alterMismatchProp));
    };

    expect(() => {
      errorTest('id', 'asdfsdaf');
    }).toThrow('"id" must be a number');

    expect(() => {
      errorTest('card_id', '1234');
    }).toThrow('"card_id" must be a valid GUID');

    expect(() => {
      errorTest('card_name', 1234);
    }).toThrow('"card_name" must be a string');

    expect(() => {
      errorTest('alter_artist', 1234);
    }).toThrow('"alter_artist" must be a string');

    expect(() => {
      errorTest('condition', 1234);
    }).toThrow('"condition" must be one of [NM, LP, MP, HP, DMG]');

    expect(() => {
      errorTest('status', 1234);
    }).toThrow(
      '"status" must be one of [NOT_FOR_SALE_TRADE, FOR_SALE_TRADE, FOR_SALE, FOR_TRADE, SOLD, TRADED, LOST, GIFT]',
    );

    expect(() => {
      errorTest('signed_by', 1234);
    }).toThrow('"signed_by" must be a string');

    expect(() => {
      errorTest('playset', {});
    }).toThrow('"playset" must be an array');
  });
});
