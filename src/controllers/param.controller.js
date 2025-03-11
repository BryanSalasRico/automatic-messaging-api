import ParamsService from "../services/params.service.js";

export class ParamController{

    static async getParams(req, res){
        var typeParam = req.query.typeParam;
        
        try{
            let response = await ParamsService.getParams(typeParam);
            return res.status(200).json(response);
        }catch(error){
            return res.status(500);
        }
    }
}