import { DocumentClient } from "aws-sdk/clients/dynamodb";
import db from "libs/dynamodb-lib";
import handler from "libs/handler-lib";

export const main = handler(async (event, context) => {
  const key: DocumentClient.Key = {
    userId: "123",
    noteId: event.pathParameters.id,
  };
  const params = {
    TableName: process.env.tableName,
    Key: key,
  };

  const results = await db.get(params);

  if (!results.Item) {
    throw new Error("Item not found.");
  }

  return results.Item;
});
