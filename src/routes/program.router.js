import { Router } from 'express'
import { ProgramController } from '../controllers/program.controller.js'; 

export const programRouter = Router();

programRouter.post('/saveProgram', ProgramController.saveProgram)