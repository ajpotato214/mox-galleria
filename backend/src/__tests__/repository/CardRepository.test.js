/* eslint-disable no-undef */
import { DescribeTableCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  GetCommand,
  BatchWriteCommand,
} from '@aws-sdk/lib-dynamodb';
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

  test('returns the count of cards in the table', async () => {
    /* Mock Responses
    ------------------------------------------------------------------------------------*/
    testCardRepository.ddb.on(ScanCommand).resolves({
      Count: 3,
    });
    /*
    ------------------------------------------------------------------------------------*/
    const input = {
      RequestItems: {
        mox_galleria_cards: [
          {
            PutRequest: {
              Item: {
                card_id: {
                  S: '1f7a05c2-c3d7-4ae1-abd4-2ccd40ffc1f9',
                },
                provider: {
                  S: 'scryfall',
                },
                metadata: {
                  M: {},
                },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                card_id: {
                  S: 'cc16dbfc-eb1d-48bf-8cb1-79be885f22e4',
                },
                provider: {
                  S: 'scryfall',
                },
                metadata: {
                  M: {},
                },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                card_id: {
                  S: 'ca19ac96-0567-41a4-92c2-8214b0748492',
                },
                provider: {
                  S: 'scryfall',
                },
                metadata: {
                  M: {},
                },
              },
            },
          },
        ],
      },
    };

    const command = new BatchWriteCommand(input);
    await testCardRepository.docddb.send(command);

    const count = await testCardRepository.count();
    expect(count).toBe(3);
  });
});
