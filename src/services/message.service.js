import { getProgram, updateProgram } from "./program.service.js";
import { FrequencyTypeEnum } from '../types/frequency-type.enum.js';
import { getDataSourceDB, getDataSourceService } from "./data-source.service.js";
import Message from "../models/message.model.js";
import Log from "../models/log.model.js";
import axios from 'axios';

const sendAllMessage = async () => {
    await sendUniqueMessage();
    await sendDailyMessage();
    await sendPeriodicMessage();

    return true;
};

const sendUniqueMessage = async () => {    
    const programList = await getProgram(FrequencyTypeEnum.UNICO);
    await processProgramList(programList);
    return "OK";
};

const sendDailyMessage = async () => {    
    const programList = await getProgram(FrequencyTypeEnum.DIARIO);
    await processProgramList(programList);
    return "OK";
};

const sendPeriodicMessage = async () => {    
    const programList = await getProgram(FrequencyTypeEnum.PERIODICO);
    await processProgramList(programList);
    return "OK";
};

const processProgramList = async (programList) => {
    await updateProgram(programList);
    await Promise.all(programList.map(async (program) => {
        const destinationsList = program.dataSourceDbId
        ? await getDataSourceDB(program.dataSourceDbId)
        : await getDataSourceService(program.dataSourceServiceId);

        const message = await Message.findByPk(program.messageId);

        if(destinationsList.length > 0){
            sendMessageClient({destinationsList, message, programId: program.id});
        }
    }));
};

const sendMessageClient = async ({destinationsList, message, programId}) => {
    const alertApiEndpoint = process.env.ALERT_API_ENDPOINT;

    try {
        const response = await axios.post(alertApiEndpoint, {
            to: destinationsList, 
            title: message.title, 
            body: message.content, 
            type: message.channelId
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseData = response.data;

        const today = new Date();
        const offset = today.getTimezoneOffset();
        const localTime = new Date(today.getTime() - (offset * 60 * 1000));

        Log.create({
            messageId: message.id,
            programId: programId,
            sendDate: localTime,
            SuccessReport: responseData.ok.join(', '),
            ErrorReport: responseData.error.join(', '),
            creationDate: localTime
        });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
    }
};

const saveMessage = async(message, transaction = null) => {
    return await Message.create({
        title: message.title,
        content: message.content,
        channelId: message.channelId,
        active: message.active,
    }, transaction ? { transaction } : {});
}

export default {
    sendAllMessage,
    sendUniqueMessage,
    sendDailyMessage,
    sendPeriodicMessage,
    saveMessage,
};
