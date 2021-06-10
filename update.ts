import { DocumentClient } from "aws-sdk/clients/dynamodb";
import dynamodbLib from "libs/dynamodb-lib";
import handler from "libs/handler-lib";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params: DocumentClient.UpdateItemInput = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  await dynamodbLib.update(params);

  return {
    status: true,
  };
});
