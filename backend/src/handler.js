module.exports.helloWorld = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Hello Mox Galleria!',
          input: event,
        },
        null,
        2
      ),
    };
  };