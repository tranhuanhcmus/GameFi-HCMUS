const swaggerDefinition = require('./swaggerDefinition');

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Đường dẫn tới các file chứa định nghĩa route
};

module.exports = swaggerOptions;
