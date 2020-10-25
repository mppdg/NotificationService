import express from 'express';
import routes from './routes';
import db from './models';
import Handler from './utils/middleware/Handler';



db.sequelize.sync();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.use(Handler.errorResponse);


let port = parseInt(process.env.PORT || "");
if (isNaN(port) || port === 0) port = 4000;

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});