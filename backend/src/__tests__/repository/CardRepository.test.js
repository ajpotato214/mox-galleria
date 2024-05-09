/* eslint-disable no-undef */
import {
  DynamoDBClient,
  CreateTableCommand,
  DeleteTableCommand,
  waitUntilTableExists,
  waitUntilTableNotExists,
  BatchWriteItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import CardRepository from '../../repository/CardRepository';
import Config from '../../../../config.dev.json';

const TABLE_NAME = Config.cardsTableName;
const REGION = Config.region;
const ENDPOINT = Config.endpoint;

describe('CardRepository', () => {
  const client = new DynamoDBClient({
    region: REGION,
    endpoint: ENDPOINT,
  });
  const docClient = DynamoDBDocumentClient.from(client);

  const testCardRepository = new CardRepository(TABLE_NAME, REGION, {
    endpoint: ENDPOINT,
  });

  beforeEach(async () => {
    // create the table before every test
    const command = new CreateTableCommand({
      TableName: TABLE_NAME,
      AttributeDefinitions: [
        {
          AttributeName: 'card_id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'card_id',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 100,
        WriteCapacityUnits: 100,
      },
    });

    await client.send(command);

    await waitUntilTableExists(
      { client, maxWaitTime: 180 },
      { TableName: 'mox_galleria_cards' },
    );
  });

  afterEach(async () => {
    // delete table after every test
    const command = new DeleteTableCommand({
      TableName: TABLE_NAME,
    });

    await client.send(command);
    await waitUntilTableNotExists(
      { client, maxWaitTime: 180 },
      { TableName: 'mox_galleria_cards' },
    );
  });

  test('returns the status of the active cards DynamoDB Table', async () => {
    const status = await testCardRepository.getTableStatus();

    expect(status).toBe('ACTIVE');
  });

  test('adds a Card to the database', async () => {
    const status = await testCardRepository.add(
      'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
      'scryfall',
      { card_id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad' },
    );

    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        card_id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
      },
    });

    const response = await docClient.send(command);

    expect(status.$metadata.httpStatusCode).toBe(200);
    expect(response.Item.card_id).toBe('d50aee81-ac6b-42cf-84b2-c1cab286bcad');
    expect(response.Item.provider).toBe('scryfall');
    expect(response.Item.metadata).toStrictEqual({
      card_id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
    });
  });

  test('returns the count of cards in the table', async () => {
    let count = await testCardRepository.count();
    expect(count).toBe(0);

    let command = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        card_id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
        provider: 'scryfall',
        metadata: {},
      },
    });

    await docClient.send(command);

    count = await testCardRepository.count();
    expect(count).toBe(1);

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

    command = new BatchWriteItemCommand(input);
    await docClient.send(command);

    count = await testCardRepository.count();
    expect(count).toBe(4);
  });
});
