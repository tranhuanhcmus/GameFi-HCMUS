const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API Documentation for your GameFi-HCMUS project',
  },
  servers: [
    {
      url: 'http://localhost:4500', // Thay đổi tùy theo cổng của bạn
      description: 'Local server',
    },
    // {
    //   url: 'https://gamefi-hcmus.onrender.com', // Thay đổi tùy theo cổng của bạn
    //   description: 'Deployed server',
    // },
  ],
};

module.exports = swaggerDefinition;
