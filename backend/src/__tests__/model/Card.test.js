/* eslint-disable no-undef */
import Card from '../../model/Card';

describe('Card', () => {
  const cardMock = {
    id: 'cf8e1b81-09c1-4cbb-bcfc-7252fff1d9e3',
    provider: 'scryfall',
    metadata: {},
  };

  test('creates a valid Card object from a valid mock Card', () => {
    const card = new Card(cardMock.id, cardMock.provider, cardMock.metadata);

    expect(card.id).toBe('cf8e1b81-09c1-4cbb-bcfc-7252fff1d9e3');
    expect(card.provider).toBe('scryfall');
    expect(card.metadata).toStrictEqual({});
  });

  test('fails validation when missing properties', () => {
    const errorTest = (key) => {
      const card = new Card(cardMock.id, cardMock.provider, cardMock.metadata);

      const cardMissingProp = { ...card };

      delete cardMissingProp[key];

      Card.validate(cardMissingProp);
    };

    expect(() => {
      errorTest('id');
    }).toThrow('"id" is required');

    expect(() => {
      errorTest('provider');
    }).toThrow('"provider" is required');

    expect(() => {
      errorTest('metadata');
    }).toThrow('"metadata" is required');
  });

  test('fails validation when passed a property with mismatched types', () => {
    const errorTest = (key, value) => {
      const card = new Card(cardMock.id, cardMock.provider, cardMock.metadata);

      const cardMissingProp = { ...card };

      cardMissingProp[key] = value;

      Card.validate(cardMissingProp);
    };

    expect(() => {
      errorTest('id', 'token');
    }).toThrow('"id" must be a valid GUID');

    expect(() => {
      errorTest('id', 1234);
    }).toThrow('"id" must be a string');

    expect(() => {
      errorTest('provider', 1);
    }).toThrow('"provider" must be a string');

    expect(() => {
      errorTest('metadata', 'token');
    }).toThrow('"metadata" must be of type object');
  });

  test('deserializes a valid escaped Card object string', () => {
    const cardObjectStringMock = '{\r\n  "id": "c7867d5c-0954-474f-83b8-a86f15c04bcd",\r\n  "provider": "scryfall",\r\n  "metadata": {}\r\n}';
    const card = Card.deserialize(cardObjectStringMock);

    expect(card.id).toBe('c7867d5c-0954-474f-83b8-a86f15c04bcd');
    expect(card.provider).toBe('scryfall');
    expect(card.metadata).toStrictEqual({});
  });

  test('fails to deserialize a malformed JSON Object string', () => {
    const cardObjectStringMock = '{asdfsdf}';

    expect(() => {
      Card.deserialize(cardObjectStringMock);
    }).toThrow('invalid JSON string');
  });

  test('fails to deserialize a card JSON Object string with a missing property', () => {
    const cardObjectStringMock = '{\r\n  "identifier": "c7867d5c-0954-474f-83b8-a86f15c04bcd",\r\n  "provider": "scryfall",\r\n  "metadata": {}\r\n}';

    expect(() => {
      Card.deserialize(cardObjectStringMock);
    }).toThrow('"id" is required');
  });

  test('fails to deserialize a card JSON object string with mismatched types', () => {
    const cardObjectStringMock = '{\r\n  "id": "c7867d5c-0954-474f-83b8-a86f15c04bcd",\r\n  "provider": 123,\r\n  "metadata": {}\r\n}';

    expect(() => {
      Card.deserialize(cardObjectStringMock);
    }).toThrow('"provider" must be a string');
  });
});
