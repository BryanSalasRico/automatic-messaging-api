import messageService from '../services/message.service.js';

export class MessageController{

    static async sendAllMessage(req, res){
      let response = await messageService.sendAllMessage();
      return res.status(200).json(response);
    }

    static async sendUniqueMessage(req, res){
      let response = await messageService.sendUniqueMessage();
      return res.status(200).json(response);
    }

    static async sendDailyMessage(req, res){
      let response = await messageService.sendDailyMessage();
      return res.status(200).json(response);
    }

    static async sendPeriodicMessage(req, res){
      let response = await messageService.sendPeriodicMessage();
      return res.status(200).json(response);
    }
}