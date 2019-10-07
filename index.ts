import { DynamoDB } from "aws-sdk"
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda"
import "source-map-support/register"

const dynamodb: DynamoDB.DocumentClient = new DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  console.log(event)

  try {
    const param: DynamoDB.DocumentClient.QueryInput = {
      TableName: "iot_dummy_data",
      KeyConditionExpression: "#pKey = :p_key and #sKey >= :s_key",
      ExpressionAttributeNames: {
        "#pKey": "ID",
        "#sKey": "record_time"
      },
      ExpressionAttributeValues: {
        ":p_key": "b001",
        ":s_key": "2019-09-19T12:00:00+09:00"
      },
      Limit: 100
    }

    const result: DynamoDB.DocumentClient.QueryOutput = await dynamodb
      .query(param)
      .promise()
    console.log(result)

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(
        {
          message: `${JSON.stringify(result)}`
        },
        null,
        2
      )
    }
  } catch (err) {
    console.error(err)
    throw {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(
        {
          message: `${JSON.stringify(err)}`
        },
        null,
        2
      )
    }
  }
}
