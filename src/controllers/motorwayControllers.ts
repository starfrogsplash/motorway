
import getNextConnection from '../../knexConfig'

const findLatest = async (id: string, timeStamp: string) => {
  const knex = getNextConnection()
  return await knex('vehicle')
    .select()
    .where('id', id)
    .where('timeStamp', '<=', timeStamp)
}

const findRevision = async (id: string, timeStamp: string) => {
  const knex = getNextConnection()
  return await knex('StateLogs')
    .select()
    .where('id', id)
    .where('timeStamp', '<=', timeStamp)
    .orderBy('revision', 'desc')
    .first()
}

const findOldestRecord = async (id: string) => {
  const knex = getNextConnection()
  return await knex('StateLogs')
    .select()
    .where('id', id)
    .orderBy('revision', 'asc')
    .first()
}

export {
  findLatest,
  findRevision,
  findOldestRecord
}
