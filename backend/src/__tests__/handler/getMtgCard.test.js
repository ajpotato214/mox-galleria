/* eslint-disable no-undef */

describe('getMtgCard', () => {
  test('returns 404 if card with ID could not be found', async () => {
    /* Mock Responses
    ------------------------------------------------------------------------------------*/
    const getMtgCardMock = jest.fn();

    getMtgCardMock.mockReturnValue({
      isBase64Encoded: false,
      statusCode: 404,
      headers: {},
      body: 'Could not find card with ID c7867d5c-0954-474f-83b8-a86f15c04bcd',
    });
    /*
    ------------------------------------------------------------------------------------*/

    const response = await getMtgCardMock('c7867d5c-0954-474f-83b8-a86f15c04bcd');

    expect(response.statusCode).toBe(404);
    expect(response.body).toBe('Could not find card with ID c7867d5c-0954-474f-83b8-a86f15c04bcd');
  });

  test('returns 200 if a card with ID is found', async () => {
    /* Mock Responses
    ------------------------------------------------------------------------------------*/
    const getMtgCardMock = jest.fn();

    getMtgCardMock.mockReturnValue({
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: JSON.stringify({
        card_id: 'c7867d5c-0954-474f-83b8-a86f15c04bcd',
        provider: 'scryfall',
        metadata: {},
      }),
    });
    /*
    ------------------------------------------------------------------------------------*/

    const response = await getMtgCardMock('c7867d5c-0954-474f-83b8-a86f15c04bcd');

    expect(response.statusCode).toBe(200);
  });
});
