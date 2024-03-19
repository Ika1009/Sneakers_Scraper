// DEVELOPER NOTE
// Ensure that you have set up the AWS SDK and configured your Lambda function with the necessary permissions to access DynamoDB. 
// Ensure that you have connected the Lambda function to the API GATEWAY so the mobiile app can call and use the API to retrieve the data
// Ensure that you have a DynamoDB table named 'SneakerOrders' with the required attributes (id, extensionId, style, size, order_date) as specified in your Lambda function code.
// When uploading, run the npm install and zip this file, package.json, package-lock.json and node_modules folder and upload it to Lambda


const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Handler function for Lambda
exports.handler = async (event) => {
    // Extract parameters from the event
    const { userId } = event.queryStringParameters;

    // Check if required parameter is provided
    if (!userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Error: userId parameter is required' })
        };
    }

    // Define the DynamoDB params for scanning the table
    const params = {
        TableName: 'SneakerOrders',
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId }
    };

    try {
        // Scan the DynamoDB table
        const data = await dynamodb.scan(params).promise();
        
        // Check if any results were found
        if (data.Items.length > 0) {
            return {
                statusCode: 200,
                body: JSON.stringify(data.Items)
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: `No shoes found for userId: ${userId}` })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Error: ${error.message}` })
        };
    }
};
