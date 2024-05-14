/* eslint-disable no-undef */
import { addCard } from '../../handler/addCard';

describe('addCard', () => {
  const eventMock = {
    input: {
      resource: '/cards',
      path: '/cards',
      httpMethod: 'POST',
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.5',
        'CloudFront-Forwarded-Proto': 'https',
        'CloudFront-Is-Desktop-Viewer': 'true',
        'CloudFront-Is-Mobile-Viewer': 'false',
        'CloudFront-Is-SmartTV-Viewer': 'false',
        'CloudFront-Is-Tablet-Viewer': 'false',
        'CloudFront-Viewer-ASN': '7922',
        'CloudFront-Viewer-Country': 'US',
        dnt: '1',
        Host: 'xxxxxxxx.execute-api.us-west-2.amazonaws.com',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
        Via: '2.0 7391f4689868fafe680597505d0ff95e.cloudfront.net (CloudFront)',
        'X-Amz-Cf-Id':
          'C4ao9heyfj6gIquQk45HMOi-WRlC-PKZkXkRTECQBfRibZNTHC7hKA==',
        'X-Amzn-Trace-Id': 'Root=1-663cf6f4-64b3faf625457bc5156ff081',
        'X-Forwarded-For': '127.0.0.1, 127.0.0.1',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https',
      },
      multiValueHeaders: {
        Accept: [
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        ],
        'Accept-Encoding': ['gzip, deflate, br'],
        'Accept-Language': ['en-US,en;q=0.5'],
        'CloudFront-Forwarded-Proto': ['https'],
        'CloudFront-Is-Desktop-Viewer': ['true'],
        'CloudFront-Is-Mobile-Viewer': ['false'],
        'CloudFront-Is-SmartTV-Viewer': ['false'],
        'CloudFront-Is-Tablet-Viewer': ['false'],
        'CloudFront-Viewer-ASN': ['7922'],
        'CloudFront-Viewer-Country': ['US'],
        dnt: ['1'],
        Host: ['xxxxxxxx.execute-api.us-west-2.amazonaws.com'],
        'sec-fetch-dest': ['document'],
        'sec-fetch-mode': ['navigate'],
        'sec-fetch-site': ['none'],
        'sec-fetch-user': ['?1'],
        'sec-gpc': ['1'],
        'upgrade-insecure-requests': ['1'],
        'User-Agent': [
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
        ],
        Via: [
          '2.0 7391f4689868fafe680597505d0ff95e.cloudfront.net (CloudFront)',
        ],
        'X-Amz-Cf-Id': [
          'C4ao9heyfj6gIquQk45HMOi-WRlC-PKZkXkRTECQBfRibZNTHC7hKA==',
        ],
        'X-Amzn-Trace-Id': ['Root=1-663cf6f4-64b3faf625457bc5156ff081'],
        'X-Forwarded-For': ['127.0.0.1, 127.0.0.1'],
        'X-Forwarded-Port': ['443'],
        'X-Forwarded-Proto': ['https'],
      },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: null,
      stageVariables: null,
      requestContext: {
        resourceId: '0ep299',
        resourcePath: '/test',
        httpMethod: 'GET',
        extendedRequestId: 'xxxxxxxx',
        requestTime: '09/May/2024:16:16:52 +0000',
        path: '/dev/test',
        accountId: '123456789',
        protocol: 'HTTP/1.1',
        stage: 'dev',
        domainPrefix: 'xxxxxxx',
        requestTimeEpoch: 1715271412195,
        requestId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        identity: {
          cognitoIdentityPoolId: null,
          accountId: null,
          cognitoIdentityId: null,
          caller: null,
          sourceIp: '127.0.0.1',
          principalOrgId: null,
          accessKey: null,
          cognitoAuthenticationType: null,
          cognitoAuthenticationProvider: null,
          userArn: null,
          userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
          user: null,
        },
        domainName: 'xxxxxxx.execute-api.us-west-2.amazonaws.com',
        deploymentId: 'xxxx',
        apiId: 'xxxxxxx',
      },
      body: null,
      isBase64Encoded: false,
    },
  };

  test('throws a 400 error if event.body is invalid JSON', async () => {
    eventMock.body = '{asdfasdf}';

    const response = await addCard(eventMock);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('invalid JSON string');
  });

  test('throws a 400 for an unrecognized or unsupported card metadata provider', async () => {
    eventMock.body = '{\r\n  "id": "c7867d5c-0954-474f-83b8-a86f15c04bcd",\r\n  "provider": "acme",\r\n  "metadata": {}\r\n}';

    const response = await addCard(eventMock);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Unrecognized or unsupported card provider: acme');
  });

  test('throws a 400 for an invalid Scryfall card with missing property', async () => {
    eventMock.body = '{\r\n  "id": "c7867d5c-0954-474f-83b8-a86f15c04bcd",\r\n  "provider": "scryfall",\r\n  "metadata": {}\r\n}';

    const response = await addCard(eventMock);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Invalid Scryfall card: "id" is required');
  });

  test('throws a 400 for an invalid Scryfall card with mismatched types', async () => {
    eventMock.body = '{\r\n  "id": "c7867d5c-0954-474f-83b8-a86f15c04bcd",\r\n  "provider": "scryfall",\r\n  "metadata": { "id": 123 }\r\n}';

    const response = await addCard(eventMock);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Invalid Scryfall card: "id" must be a string');
  });

  test('returns 200 for successfully adding a card', async () => {
    const addCardMock = jest.fn();

    addCardMock.mockReturnValue({
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: 'Successfully added Scryfall card: Brainstorm',
    });

    eventMock.body = '{\r\n  "id": "c7867d5c-0954-474f-83b8-a86f15c04bcd",\r\n  "provider": "scryfall",\r\n  "metadata": { "name": "Brainstorm" }\r\n}';

    const response = addCardMock(eventMock);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Successfully added Scryfall card: Brainstorm');
  });
});
