import { Handler, Context, Callback, CustomAuthorizerEvent } from "aws-lambda"
import * as jsonwebtoken from "jsonwebtoken"
import jwkToPem from "jwk-to-pem"
import jwk from "./jwk"
const pem = jwkToPem(jwk as any)

export const handler: Handler = async (
  event: CustomAuthorizerEvent,
  _context: Context,
  callback: Callback
): Promise<any> => {
  console.log(JSON.stringify(event))

  jsonwebtoken.verify(
    event.authorizationToken,
    pem,
    {
      algorithms: ["RS256"]
    },
    (err: jsonwebtoken.VerifyErrors, decodedToken: object | string) => {
      if (err) {
        callback(null, {
          principalId: 1,
          policyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Action: "execute-api:Invoke",
                Effect: "Deny",
                Resource: event.methodArn
              }
            ]
          },
          context: {
            messagge: "Custom Error Message"
          }
        })
      } else {
        console.log(decodedToken)
        callback(null, {
          principalId: 1,
          policyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Action: "execute-api:Invoke",
                Effect: "Allow",
                Resource: event.methodArn
              }
            ]
          },
          context: {
            messagge: "Custom Allow Message"
          }
        })
      }
    }
  )
}
