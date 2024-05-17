/* eslint-disable no-undef */
import { addMtgAlter } from '../../handler/addMtgAlter';

describe('addMtgAlter', () => {
  const eventMock = {
    body: JSON.stringify({
      id: 4,
      card_id: 'beb755c1-9221-480e-bef9-73f1f13a3345',
      card_name: 'Brainstorm',
      alter_artist: 'GK Alters',
      condition: 'LP',
      status: 'NOT_FOR_SALE_TRADE',
      signed_by: '',
    }),
  };

  test('throws a 400 error if the event body is invalid JSON', async () => {
    const malformed = { ...eventMock };

    malformed.body = '{this is malformed JSON}';

    const response = await addMtgAlter(malformed);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('invalid JSON string');
  });

  test('throws a 400 error if the event body is missing a required property', async () => {
    const missing = { ...eventMock };

    missing.body = JSON.parse(missing.body);
    delete missing.body.id;
    missing.body = JSON.stringify(missing.body);

    const response = await addMtgAlter(missing);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('"id" is required');
  });
});
