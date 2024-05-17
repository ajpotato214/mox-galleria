/* eslint-disable no-undef */
import { DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import AlterRepository from '../../repository/AlterRepository';

const { MOX_GALLERIA_MTG_ALTERS_TABLE, REGION } = process.env;

describe('AlterRepository', () => {
  const testAlterRepository = new AlterRepository(
    MOX_GALLERIA_MTG_ALTERS_TABLE,
    REGION,
  );
  testAlterRepository.ddb = mockClient(testAlterRepository.ddb);
  testAlterRepository.docddb = mockClient(testAlterRepository.docddb);

  beforeEach(async () => {
    testAlterRepository.ddb.reset();
    testAlterRepository.docddb.reset();
  });

  test('returns the status of the active alters DynamoDB Table', async () => {
    /* Mock Responses
    ------------------------------------------------------------------------------------*/
    testAlterRepository.ddb.on(DescribeTableCommand).resolves({
      Table: {
        TableStatus: 'ACTIVE',
      },
    });

    const status = await testAlterRepository.getTableStatus();

    expect(status).toBe('ACTIVE');
    /*
    ------------------------------------------------------------------------------------*/
  });

  test('adds an alter to the database', async () => {
    /* Mock Responses
    ------------------------------------------------------------------------------------*/
    testAlterRepository.docddb.on(PutCommand).resolves({
      $metadata: {
        httpStatusCode: 200,
      },
    });
    /*
    ------------------------------------------------------------------------------------*/

    const status = await testAlterRepository.add(
      4,
      'beb755c1-9221-480e-bef9-73f1f13a3345',
      'Brainstorm',
      'GK Alters',
      'LP',
      'NOT_FOR_SALE_TRADE',
      '',
    );

    expect(status.$metadata.httpStatusCode).toBe(200);
  });
});
