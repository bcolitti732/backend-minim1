import express, { RequestHandler } from 'express';
import { startConnection } from './database';
import { setupSwagger } from './swagger'; 
import corsOptions from './middlewares/cors';
import userRoutes from './routes/user.routes'; 
import packetRoutes from './routes/packet.routes';
import ratingsRoutes from './routes/ratings.routes';

const app: express.Application = express();

app.set('port', process.env.PORT || 4000);

app.use(corsOptions);
app.use(express.json() as RequestHandler);

startConnection();

setupSwagger(app);

app.use('/api/users', userRoutes);
app.use('/api/packets', packetRoutes);
app.use('/api/ratings', ratingsRoutes); 

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
    console.log(`Swagger disponible a http://localhost:${app.get('port')}/api-docs`);
});

export default app;