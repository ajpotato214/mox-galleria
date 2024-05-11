/* eslint-disable no-undef */
import { DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

import CardRepository from '../../repository/CardRepository';
import Config from '../../../../config.dev.json';

const TABLE_NAME = Config.cardsTableName;
const REGION = Config.region;

describe('CardRepository', () => {
  const testCardRepository = new CardRepository(TABLE_NAME, REGION);
  testCardRepository.ddb = mockClient(testCardRepository.ddb);
  testCardRepository.docddb = mockClient(testCardRepository.docddb);

  beforeEach(async () => {
    testCardRepository.ddb.reset();
    testCardRepository.docddb.reset();
  });

  test('returns the status of the active cards DynamoDB Table', async () => {
    /* Mock Responses
    ------------------------------------------------------------------------------------*/
    testCardRepository.ddb.on(DescribeTableCommand).resolves({
      Table: {
        TableStatus: 'ACTIVE',
      },
    });
    /*
    ------------------------------------------------------------------------------------*/

    const status = await testCardRepository.getTableStatus();

    expect(status).toBe('ACTIVE');
  });

  test('adds a card to the database', async () => {
    /* Mock Responses
    ------------------------------------------------------------------------------------*/
    testCardRepository.docddb.on(PutCommand).resolves({
      $metadata: {
        httpStatusCode: 200,
      },
    });

    testCardRepository.docddb.on(GetCommand).resolves({
      Item: {
        card_id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
        provider: 'scryfall',
        metadata: { card_id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad' },
      },
    });
    /*
    ------------------------------------------------------------------------------------*/

    const status = await testCardRepository.add(
      'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
      'scryfall',
      { card_id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad' },
    );

    expect(status.$metadata.httpStatusCode).toBe(200);

    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        card_id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
      },
    });

    const response = await testCardRepository.docddb.send(command);

    expect(response.Item.card_id).toBe('d50aee81-ac6b-42cf-84b2-c1cab286bcad');
    expect(response.Item.provider).toBe('scryfall');
    expect(response.Item.metadata).toStrictEqual({
      card_id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
    });
  });
});
