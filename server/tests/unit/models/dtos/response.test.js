const { response } = require('@models/dtos');

describe('Response.dto', () => {
  it('should generate an object with data and an optional message', () => {
    const data = { key: 'value' };
    const message = 'Success message';

    const result = response.generate(data, message);

    expect(result).toEqual({
      message: 'Success message',
      data: { key: 'value' },
    });
  });

  it('should generate an object with data and an empty message if not provided', () => {
    const data = { key: 'value' };

    const result = response.generate(data);

    expect(result).toEqual({
      message: '',
      data: { key: 'value' },
    });
  });
});
