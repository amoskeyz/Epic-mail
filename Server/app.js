import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/userRoute';
import messageRouter from './routes/messageRoute';
import groupRouter from './routes/groupRoute';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v2/', router);
app.use('/api/v2/', messageRouter);
app.use('/api/v2/', groupRouter);

app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page not found',
}));

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`App is on ${port}`);
});

export default app;
