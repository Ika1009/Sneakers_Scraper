// DEVELOPER NOTE
// Ensure that you have set up the AWS SDK and configured your Lambda function with the necessary permissions to access DynamoDB. 
// Ensure that you have connected the Lambda function to the API GATEWAY so the extension can call and use the API
// Ensure that you have a DynamoDB table named 'SneakerOrders' with the required attributes (id, extensionId, style, size, order_date) as specified in your Lambda function code.
// When uploading, run the npm install and zip this file, package.json, package-lock.json and node_modules folder and upload it to Lambda

// Import the AWS SDK and create a DynamoDB client
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Handler function for Lambda
exports.handler = async (event) => {
    // Extract parameters from the event
    const { id, style, size } = JSON.parse(event.body);

    // Check if required parameters are provided
    if (!id || !style || !size) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Error: ID, style, and size parameters are required' })
        };
    }

    // Define the DynamoDB params for putting item
    const params = {
        TableName: 'SneakerOrders',
        Item: {
            id: id,
            extensionId: event.requestContext.identity.sourceIp,
            style: style,
            size: size,
            order_date: new Date().toISOString()
        }
    };

    try {
        // Put item into DynamoDB table
        await dynamodb.put(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Sneaker order added successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error: ' + error.message })
        };
    }
};


