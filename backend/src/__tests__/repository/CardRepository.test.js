/* eslint-disable no-undef */
import { DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

import CardRepository from '../../repository/CardRepository';

const { MOX_GALLERIA_MTG_CARDS_TABLE, REGION } = process.env;

describe('CardRepository', () => {
  const testCardRepository = new CardRepository(
    MOX_GALLERIA_MTG_CARDS_TABLE,
    REGION,
  );
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
        id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
        provider: 'scryfall',
        metadata: { id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad' },
      },
    });
    /*
    ------------------------------------------------------------------------------------*/

    const status = await testCardRepository.add(
      'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
      'scryfall',
      { id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad' },
    );

    expect(status.$metadata.httpStatusCode).toBe(200);

    const command = new GetCommand({
      TableName: MOX_GALLERIA_MTG_CARDS_TABLE,
      Key: {
        id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
      },
    });

    const response = await testCardRepository.docddb.send(command);

    expect(response.Item.id).toBe('d50aee81-ac6b-42cf-84b2-c1cab286bcad');
    expect(response.Item.provider).toBe('scryfall');
    expect(response.Item.metadata).toStrictEqual({
      id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
    });
  });

  test('gets a card from the database by id', async () => {
    /* Mock Responses
    ------------------------------------------------------------------------------------*/
    testCardRepository.docddb.on(PutCommand).resolves({
      $metadata: {
        httpStatusCode: 200,
      },
    });

    testCardRepository.docddb.on(GetCommand).resolves({
      Item: {
        id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
        provider: 'scryfall',
        metadata: { id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad' },
      },
    });
    /*
    ------------------------------------------------------------------------------------*/

    const command = new PutCommand({
      TableName: MOX_GALLERIA_MTG_CARDS_TABLE,
      Item: {
        id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
        provider: 'scryfall',
        metadata: { id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad' },
      },
    });

    await testCardRepository.docddb.send(command);

    const response = await testCardRepository.findOne(
      'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
    );

    expect(response.id).toBe('d50aee81-ac6b-42cf-84b2-c1cab286bcad');
    expect(response.provider).toBe('scryfall');
    expect(response.metadata).toStrictEqual({
      id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
    });
  });

  test('returns null if it could not find a card from the database by id', async () => {
    /* Mock Responses
    ------------------------------------------------------------------------------------*/
    testCardRepository.docddb.on(PutCommand).resolves({
      $metadata: {
        httpStatusCode: 200,
      },
    });

    testCardRepository.docddb.on(GetCommand).resolves({
      Item: null,
    });
    /*
    ------------------------------------------------------------------------------------*/

    const command = new PutCommand({
      TableName: MOX_GALLERIA_MTG_CARDS_TABLE,
      Item: {
        id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad',
        provider: 'scryfall',
        metadata: { id: 'd50aee81-ac6b-42cf-84b2-c1cab286bcad' },
      },
    });

    await testCardRepository.docddb.send(command);

    const response = await testCardRepository.findOne(
      'd50aee81-ac6b-42cf-84b2-xxxxxxxxx',
    );

    expect(response).toBeFalsy();
  });
});
