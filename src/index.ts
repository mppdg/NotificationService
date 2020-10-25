import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



let port = parseInt(process.env.PORT || "");
if (isNaN(port) || port === 0) port = 4000;

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});