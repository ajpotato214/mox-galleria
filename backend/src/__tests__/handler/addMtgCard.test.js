/* eslint-disable no-undef */
import { addMtgCard } from '../../handler/addMtgCard';

describe('addMtgCard', () => {
  const eventMock = {
    body: JSON.stringify({
      id: 'c7867d5c-0954-474f-83b8-a86f15c04bcd',
      provider: 'scryfall',
      metadata: {},
    }),
  };

  test('throws a 400 error if event.body is invalid JSON', async () => {
    const malformed = { ...eventMock };

    malformed.body = '{this is malformed JSON}';

    const response = await addMtgCard(malformed);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('invalid JSON string');
  });

  test('throws a 400 for an unrecognized or unsupported card metadata provider', async () => {
    const unsupported = { ...eventMock };
    unsupported.body = JSON.parse(unsupported.body);
    unsupported.body.provider = 'acme';
    unsupported.body = JSON.stringify(unsupported.body);

    const response = await addMtgCard(unsupported);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Unrecognized or unsupported card provider: acme');
  });

  test('throws a 400 for an invalid Scryfall card with missing property', async () => {
    const missing = { ...eventMock };

    const response = await addMtgCard(missing);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Invalid Scryfall card: "id" is required');
  });

  test('throws a 400 for an invalid Scryfall card with mismatched types', async () => {
    const mismatched = { ...eventMock };
    mismatched.body = JSON.parse(mismatched.body);
    mismatched.body.metadata.id = 1234;
    mismatched.body = JSON.stringify(mismatched.body);

    const response = await addMtgCard(mismatched);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Invalid Scryfall card: "id" must be a string');
  });
});
