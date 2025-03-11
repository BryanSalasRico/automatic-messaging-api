import { Router } from 'express'
import { ParamController } from '../controllers/param.controller.js';

export const paramRouter = Router();

paramRouter.get('/getParams', ParamController.getParams)