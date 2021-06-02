import * as uuid from "uuid";
import * as AWS from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";
import handler from "libs/handler-lib";
import db from "libs/dynamodb-lib";
import {
  DocumentClient,
  PutItemInputAttributeMap,
} from "aws-sdk/clients/dynamodb";

export const main: APIGatewayProxyHandler = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const item: DocumentClient.PutItemInputAttributeMap = {
    // The attributes of the item to be created
    userId: "123",
    // The id of the author
    noteId: uuid.v1(), // A unique uuid
    content: data.content,
    // Parsed from request body
    attachment: data.attachment, // Parsed from request body
    createdAt: Date.now() + "",
    // Current Unix timestamp
  };

  const params = {
    TableName: process.env.tableName,
    Item: item,
  };

  db.put(params);

  return params.Item;
});
