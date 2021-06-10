import { DocumentClient } from "aws-sdk/clients/dynamodb";
import dynamodbLib from "libs/dynamodb-lib";
import handler from "libs/handler-lib";

export const main = handler(async (event) => {
  const params: DocumentClient.DeleteItemInput = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id,
    },
  };

  await dynamodbLib.delete(params);

  return {
    status: true,
  };
});
