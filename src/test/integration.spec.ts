import request from 'supertest'
import { app } from '../app'
import { statelogCache } from '../utils/cache'
import * as motorwayControllers from "../controllers/motorwayControllers";
import db from '../../knexConfig'

const mockedFindStateLog = jest.spyOn(motorwayControllers, 'findStateLog');
const mockedCache = jest.spyOn(statelogCache, 'get');

describe('GET /motorways/vehicleId/timestamp', () => {
    beforeAll(async () => {
      await db.migrate.latest()
    })

    afterEach(async () => {
      jest.resetAllMocks()
    })

    afterAll(async() => {
      await db.destroy()
   })
  
    describe('fetch statelogs', () => {
      it('should return VW with log date of "2022-09-11 23:21:38+00" and state of "selling"', async () => {
        const { body: statelog, status } = await request(app).get(`/motorway/3/2022-09-12 10:00:00+00`)

        const expStatelog = {
            "vehicleId": 3,
            "state": "selling",
            "timestamp": "2022-09-11T23:21:38.000Z"
        }
        expect(statelog).toEqual(expStatelog)
        expect(status).toEqual(200)
      })


      it('should return from cache if the query was requested before', async () => {
        const res1 = await request(app).get(`/motorway/3/2022-09-12 10:00:00+00`)
        expect(mockedFindStateLog).toHaveBeenCalledTimes(1)
        const cachedlog = {
          "vehicleId": 3,
          "state": "selling",
          "timestamp": "2022-09-11T23:21:38.000Z"
      }
        mockedCache.mockReturnValue(cachedlog)

        const res2 = await request(app).get(`/motorway/3/2022-09-12 10:00:00+00`)
        expect(mockedFindStateLog).toHaveBeenCalledTimes(1)

        mockedCache.mockReturnValue(null)
        const res3 = await request(app).get(`/motorway/3/2022-09-12 10:00:00+00`)
        expect(mockedFindStateLog).toHaveBeenCalledTimes(2)
      })

      it('should return empty with log date of "2021-09-12"', async () => {
        const { body: statelog, status } = await request(app).get(`/motorway/3/2021-09-12`)

        expect(statelog).toEqual("not found")
        expect(status).toEqual(404)
      })

      it('should return error message when invalid date is entered', async () => {
        const { body: statelog, status } = await request(app).get(`/motorway/3/humpty`)

        expect(statelog).toEqual('not a valid date')
        expect(status).toEqual(400)
      })

      it('should return from cache', async () => {
        const { body: statelog, status } = await request(app).get(`/motorway/3/2021-09-12`)

        expect(statelog).toEqual("not found")
        expect(status).toEqual(404)
      })

    })
  })