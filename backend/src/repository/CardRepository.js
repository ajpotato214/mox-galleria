import {
  DynamoDBClient,
  DescribeTableCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import IDynamoDBRepository from './IDynamoDBRepository';

export default class CardRepository extends IDynamoDBRepository {
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

  async add(cardId, provider, metadata) {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: { card_id: cardId, provider, metadata },
    });

    const response = await this.docddb.send(command);

    return response;
  }

  async count() {
    const config = {
      TableName: this.tableName,
    };

    const command = new ScanCommand(config);
    const response = await this.ddb.send(command);

    return response.Count;
  }
}
