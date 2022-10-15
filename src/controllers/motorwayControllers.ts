import getNextConnection from '../../knexConfig'

const findStateLog = async (id: string, timeStamp: string) => {
  const knex = getNextConnection()
  return await knex('stateLogs')
    .select()
    .where('id', id)
    .where('timeStamp', '<=', timeStamp)
    .orderBy('revision', 'desc')
    .first()
}

export {
  findStateLog
}
