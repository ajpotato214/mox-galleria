/* eslint-disable no-undef */
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import CardRepository from '../../repository/CardRepository';
import Config from '../../../../config.dev.json';

const TABLE_NAME = Config.cardsTableName;
const REGION = Config.region;
const ENDPOINT = Config.endpoint;

describe('CardRepository', () => {
  const testCardRepository = new CardRepository(TABLE_NAME, REGION, {
    endpoint: ENDPOINT,
  });

  const client = new DynamoDBClient({
    region: REGION,
    endpoint: ENDPOINT,
  });
  const docClient = DynamoDBDocumentClient.from(client);

  afterEach(async () => {
    // clear the database
    let command = new ScanCommand({
      TableName: TABLE_NAME,
    });

    const response = await docClient.send(command);

    if (response.Count === 0) {
      return;
    }

    Object.values(response.Items).forEach(async (item) => {
      command = new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
          card_id: item.card_id,
        },
      });

      await docClient.send(command);
    });
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
});
