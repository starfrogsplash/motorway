import { Router } from "express";
import {statelogCache} from '../utils/cache';
import { findStateLog } from '../controllers/motorwayControllers'
import {dateNormalizer} from '../utils/dateNormalizer'

const motorwayRouter = Router()

motorwayRouter.get('/motorway/:vehicleId/:timestamp', async (req, res) => {
    const { vehicleId, timestamp } = req.params
    let validTimestamp = undefined

    try {
        validTimestamp = dateNormalizer(timestamp)
    } catch (error: any) {
        return res.status(400).json(error.message)
    }
   
    const cachedLog = statelogCache.get(`${vehicleId}-${validTimestamp}`)

    if (!cachedLog) {
        try {
            const foundLog = await findStateLog(vehicleId, validTimestamp)
            statelogCache.set(`${vehicleId}-${validTimestamp}`, foundLog)
            if(foundLog){
                req.log.info('statelog:', foundLog)
                return res.status(200).json(foundLog)
            }else {
                return res.status(404).json('not found')
            }
        
        } catch (error) {
            req.log.error(error)
            res.status(400).json('retrieve failed')
        }
    }

    res.status(200).json(cachedLog)
})

export {
    motorwayRouter
}
