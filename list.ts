import { DocumentClient } from "aws-sdk/clients/dynamodb";
import db from "libs/dynamodb-lib";
import handler from "libs/handler-lib";

export const main = handler(async () => {
  const params: DocumentClient.QueryInput = {
    TableName: process.env.tableName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };

  const results = await db.query(params);

  return results.Items;
});
