import { Router } from "express";
import { findStateLog } from '../controllers/motorwayControllers'
import NodeCache from "node-cache";
const myCache = new NodeCache();

const motorwayRouter = Router()

// Todo: implement caching
// add validation for correct timestamp?
motorwayRouter.get('/motorway/:id/:timeStamp', async (req, res) => {
    const { id, timeStamp } = req.params
    const cachedLog = myCache.get(`${id}-${timeStamp}`)

    if (!cachedLog) {
        try {
            const foundLog = await findStateLog(id, timeStamp)
            // set the log in the cache
            myCache.set(`${id}-${timeStamp}`, foundLog)
            req.log.info('statelog:', foundLog)
            res.status(200).json(foundLog)
        } catch (error) {
            req.log.error(error)
            res.status(400).json('retreive failed')
        }
    }

    res.status(400).json(cachedLog)
})

export {
    motorwayRouter
}
