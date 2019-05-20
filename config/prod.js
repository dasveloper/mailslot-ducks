//Prod keys
module.exports={
  
    mongoUri: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
  sendGridAPI: process.env.SEND_GRID_API,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  awsBucket: process.env.AWS_BUCKET,
 }