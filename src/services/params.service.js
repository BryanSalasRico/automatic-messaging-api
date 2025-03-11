import FrequencyType from '../models/frequency-type.model.js';
import Channel from '../models/channel.model.js';
import { ParamTypeEnum } from '../types/param-type.enum.js';

const getParams = async (typeParam) => {
    var response = { 
        ok: true,
        status: 'OK',
        error: '',
        data: []
    }

    const numTypeParam = Number(typeParam);
    if(isNaN(numTypeParam)){
        response.ok = false;
        response.status = 'Error';
        response.error = 'El parámetro no es un número válido';
        response.data =  [];
        return response;
    }

    switch(numTypeParam){
        case ParamTypeEnum.FREQUENCY_TYPE:
            response.data = await FrequencyType.findAll({
                where: {
                    active: true
                }
            });
            break;
        case ParamTypeEnum.CHANNELS:
            response.data = await Channel.findAll({
                where: {
                    active: true
                }
            });
            break;
        default:
            response.ok = false;
            response.status = 'Error';
            response.error = 'Tipo de parámetro no encontrado';
            response.data =  [];
            break;
    }

    return response;
};

export default{
    getParams
}