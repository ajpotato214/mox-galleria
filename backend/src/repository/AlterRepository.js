import { DynamoDBClient, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  DynamoDBDocumentClient,
} from '@aws-sdk/lib-dynamodb';
import IDynamoDBRepository from './IDynamoDBRepository';

export default class AlterRepository extends IDynamoDBRepository {
  constructor(tableName, region, config = {}) {
    super();

    this.tableName = tableName;
    this.region = region;
    this.ddb = new DynamoDBClient({ region, ...config });
    this.docddb = DynamoDBDocumentClient.from(this.ddb);
  }

  async getTableStatus() {
    const config = {
      TableName: this.tableName,
    };

    const command = new DescribeTableCommand(config);
    const response = await this.ddb.send(command);

    return response.Table.TableStatus;
  }

  async add(id, cardId, cardName, alterArtist, condition, status, signedBy) {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        id,
        cardId,
        cardName,
        alterArtist,
        condition,
        status,
        signedBy,
      },
    });

    const response = await this.docddb.send(command);

    return response;
  }
}
