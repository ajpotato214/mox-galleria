/* eslint-disable no-undef */
import CardRepository from '../../repository/CardRepository';

const TABLE_NAME = 'mox_galleria_cards';
const REGION = 'localhost';
const ENDPOINT = 'http://localhost:4566';

describe('CardRepository', () => {
  const testCardRepository = new CardRepository(TABLE_NAME, REGION, { endpoint: ENDPOINT });

  test('returns the status of the active cards DynamoDB Table', async () => {
    const status = await testCardRepository.getTableStatus();

    expect(status).toBe('ACTIVE');
  });
});
