import { Op } from 'sequelize';
import sequelize from '../config/dbConnection.config.js';
import Program from '../models/program.model.js'
import { FrequencyTypeEnum } from '../types/frequency-type.enum.js';
import messageService from './message.service.js';
import { saveDataSourceService } from './data-source.service.js';

export const getProgram = async (frequencyType) => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localTime = new Date(today.getTime() - (offset * 60 * 1000));
    const t = await sequelize.transaction();

    try {
        const whereConditions = {
            active: true,
            frequencyTypeId: frequencyType,
            nextExecution: {
                [Op.lt]: localTime,
            },
        };

        const programs = await Program.findAll({
            where: whereConditions,
            transaction: t,
        });

        await t.commit();
        return programs;
    } catch (error) {
        await t.rollback();
        console.error('Error al cargar programas:', error);
        throw error;
    }
};

export const updateProgram = async (programList) => {
    const t = await sequelize.transaction();
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localTime = new Date(today.getTime() - (offset * 60 * 1000));

    try {
        await Promise.all(programList.map(async (program) => {
            const endDate = new Date(program.endDate);
            const endDateLocalTime = new Date(endDate.getTime() - (offset * 60 * 1000));
            const nextExecutionDate = new Date(program.nextExecution);
            const nextExecutionLocalTime = new Date(nextExecutionDate.getTime() - (offset * 60 * 1000));
            let status = true;

            switch (program.frequencyTypeId) {
                case FrequencyTypeEnum.UNICO:
                    status = false;
                    break;
                case FrequencyTypeEnum.DIARIO:
                    nextExecutionLocalTime.setDate(nextExecutionLocalTime.getDate() + 1);
                    if (nextExecutionLocalTime > endDateLocalTime) {
                        status = false;
                    }
                    break;
                case FrequencyTypeEnum.PERIODICO:
                    nextExecutionLocalTime.setMinutes(nextExecutionLocalTime.getMinutes() + program.intervalMinutes);
                    if (nextExecutionLocalTime > endDateLocalTime) {
                        status = false;
                    }
                    break;
            }

            await program.update({
                lastExecution: localTime,
                nextExecution: nextExecutionLocalTime,
                active: status
            }, { transaction: t });
        }));

        await t.commit();
    } catch (error) {
        await t.rollback();
        console.error('Error actualizando programas:', error);
        throw error;
    }
};

export const saveAllProgram = async (data) =>{
    const t = await sequelize.transaction();
    try {
        const message = await messageService.saveMessage(data.message, t)

        const dataSourceService = await saveDataSourceService(data.dataSource, t);
 
        await Program.create({
            messageId: message.id,
            frequencyTypeId: data.program.frequencyTypeId,
            intervalMinutes: data.program.intervalMinutes,
            nextExecution: data.program.nextExecution,
            lastExecution: data.program.lastExecution,
            initialDate: data.program.initialDate,
            endDate: data.program.endDate,
            active: data.program.active,
            dataSourceServiceId: dataSourceService.id,
        }, { transaction: t });

        await t.commit();
        return { ok: true, status: 'OK', data: 'Guardado con exito' };
    } catch (error) {
        await t.rollback();
        return { ok: false, status: 'Error', data: 'Error al guardar', error: error.message };
    }
}