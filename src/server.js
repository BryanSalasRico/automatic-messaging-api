import express from 'express'
import { corsMiddleware } from './middlewares/cors.middleware.js'
import { messageRouter } from './routes/message.router.js'
import { paramRouter } from './routes/param.router.js';
import { programRouter } from './routes/program.router.js';

const app = express()
app.use(express.json());
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/api/message', messageRouter)
app.use('/api/param', paramRouter)
app.use('/api/program', programRouter)

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});