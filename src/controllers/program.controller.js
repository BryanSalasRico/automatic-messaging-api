import { saveAllProgram } from "../services/program.service.js";

export class ProgramController{

    static async saveProgram(req, res){        
        try{
            let response = await saveAllProgram(req.body);
            return res.status(200).json(response);
        }catch(error){
            return res.status(500);
        }
    }
}