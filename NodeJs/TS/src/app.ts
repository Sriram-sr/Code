import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todo-routes';

const app = express();

app.use(bodyParser.json());
app.use(todoRoutes);

app.listen(8080, () => {
    console.log('Server Started...');
});

