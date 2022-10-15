import { Router } from "express";
import { findLatest, findRevision, findOldestRecord } from '../controllers/motorwayControllers'

const motorwayRouter = Router()

motorwayRouter.get('/motorway/:title/:timeStamp', async (req, res) => {
    const { title, timeStamp } = req.params

    try {
        const foundLatest = await findLatest(title, timeStamp)
        if (foundLatest.length > 0) {
            req.log.info('foundLatest', foundLatest)
            return res.status(200).json(foundLatest)
        } else {
            const foundRevision = await findRevision(title, timeStamp)
      
            if (foundRevision) {
                req.log.info('foundRevision', foundRevision)
                return res.status(200).json(foundRevision)
            } else {
                const oldestRecord = await findOldestRecord(title)
                return oldestRecord ? res.status(200).json(oldestRecord) : res.status(404).json('Not found')
            }
        }

    } catch (error) {
        req.log.error(error)
        res.status(400).json('retreive failed')
    }
})

export {
    motorwayRouter
}
