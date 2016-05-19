import cors from 'cors';
import { classApiResolver } from 'routers';

export default function(app) {
  const resolve = classApiResolver('routes');

  app.use(cors());

  app.get('/todos', resolve('todos#index'));
  app.post('/todos', resolve('todos#create'));
  app.delete('/todos', resolve('todos#clear'));
  app.get('/todos/:id', resolve('todos#get'));
  app.patch('/todos/:id', resolve('todos#patch'));
  app.delete('/todos/:id', resolve('todos#destroy'));

  app.use(resolve.errorHandler);
}
