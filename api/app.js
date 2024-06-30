const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const userRouter = require('./routes/userRouter');
const {catchEventNFT} = require('./catchNFTEvents.js');
const models = require('./database/models');
const { formatResponse } = require('./middlewares');
const { 
  nftRouter, 
  tokenUriRouter, 
  itemGameRouter, 
  itemAppRouter, 
  itemGameOwnerRouter, 
  itemAppOwnerRouter, 
  adminRouter, 
  hangmanRouter,
  bearRouter,
  boostEffectRouter,
  elementPoolRouter,
  eyePoolRouter,
  furPoolRouter, 
  itemPoolRouter,
  cupRouter 
} = require('./routes');

const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT|| 4500;


// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors());
app.use(formatResponse)
app.use(express.static('public'));

// Swagger configuration
const swaggerOptions = require('./swaggerOptions');
const { ContractController } = require('./controllers/ContractController');
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// Routes
app.use('/user', userRouter);
app.use('/hangmans', hangmanRouter);
app.use('/bears', bearRouter);
app.use('/boostEffects', boostEffectRouter);
app.use('/cups', cupRouter);
app.use('/eyes', eyePoolRouter);
app.use('/elements', elementPoolRouter);
app.use('/furs', furPoolRouter);
app.use('/items', itemPoolRouter);
app.use('/nfts', nftRouter);
app.use('/tokenUris', tokenUriRouter);
app.use('/itemGames', itemGameRouter);
app.use('/itemApps', itemAppRouter);
app.use('/itemGameOwners', itemGameOwnerRouter);
app.use('/itemAppOwners', itemAppOwnerRouter);

// Web admin
app.use("/admin",adminRouter)
app.get("*",(req,res)=>res.render("error"))

async function connectDB() {
  try {
    await models.sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await models.sequelize.sync({ alter: true });
    console.log('All models are sync successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

connectDB().then((connected) => {
  if (connected) {

    app.listen(port, () => {
      console.log(`Server is running on ${process.env.SERVER_URL}:${port}`);
      //====================================Events====================================//
      // ContractController.updateDB(6199383,6218924)      
      ContractController.catchEventNFT()      
    });
  }
});
