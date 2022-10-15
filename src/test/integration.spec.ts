import request from 'supertest'
import { app } from '../app'
import { globalSetUp } from './global-setup'

describe('motorways', () => {
  let knex: any
  const database = 'motorwayTest'

    beforeAll(async () => {
      knex = await globalSetUp(database)
    })

    afterAll((done) => {
      knex.destroy()
      done()
   })
  
    describe('fetch statelogs', () => {
      it('GET /motorways => should return list of all motorways', async () => {
        const { body: statelogs, status } = await request(app).get(`/motorways/BMW/2022-10-10T21:20:24.790Z`)
        expect(null).toEqual(null)
        expect(statelogs.length).toEqual(3)
        expect(status).toEqual(200)
      })

    })
  })