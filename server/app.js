
require("dotenv").config();

const app= require('./src');

const port= process.env.PORT;


const onListeningLog =`server start at port no ${port}`;

const onListening = ()=> console.log(onListeningLog);

app.listen(port,onListening());

module.exports=app;
