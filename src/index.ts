import express from 'express';
import { Server } from 'http';
import { config } from 'dotenv'; config()
import cors from 'cors';
import routes from './routes';
import db from './models';
import Handler from './utils/middleware/Handler';
import SocketIO from './utils/middleware/SocketIO';

db.sequelize.sync();

const app = express();
const server = new Server(app);

app.use(cors());
app.use(SocketIO.setup(server));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use(Handler.errorResponse);


let port = parseInt(process.env.PORT || "");
if (isNaN(port) || port === 0) port = 4000;


server.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});