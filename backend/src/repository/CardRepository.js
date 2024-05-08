import { DynamoDBClient, DescribeTableCommand } from '@aws-sdk/client-dynamodb';
import IDynamoDBRepository from './IDynamoDBRepository';

export default class CardRepository extends IDynamoDBRepository {
  constructor(tableName, region, config = {}) {
    super();

    this.tableName = tableName;
    this.region = region;
    this.ddb = new DynamoDBClient({ region, ...config });
  }

  async getTableStatus() {
    const config = {
      TableName: this.tableName,
    };

    const command = new DescribeTableCommand(config);
    const response = await this.ddb.send(command);

    return response.Table.TableStatus;
  }
}
