import { Router } from 'express'
import { MessageController } from '../controllers/message.controller.js';

export const messageRouter = Router();

messageRouter.get('/sendUniqueMessage', MessageController.sendUniqueMessage)
messageRouter.get('/sendDailyMessage', MessageController.sendDailyMessage)
messageRouter.get('/sendPeriodicMessage', MessageController.sendPeriodicMessage)
messageRouter.get('/sendAllMessages', MessageController.sendAllMessage)