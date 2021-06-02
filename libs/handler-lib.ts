import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
  Callback,
  Context,
} from "aws-lambda";

const handler = (
  lamda: (
    event: APIGatewayProxyEvent,
    context: Context,
    callback: Callback<APIGatewayProxyResult>
  ) => any
): APIGatewayProxyHandler => {
  const wrapper: APIGatewayProxyHandler = async (...params) => {
    let statusCode, body;
    try {
      body = await lamda(...params);

      statusCode = 200;
    } catch (e) {
      statusCode = 500;
      body = JSON.stringify({ error: e.message });
    }

    return {
      statusCode,
      body: JSON.stringify(body),
    };
  };

  return wrapper;
};

export default handler;
