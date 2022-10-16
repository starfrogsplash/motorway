import getNextConnection from '../../knexConfig'

const findStateLog = async (vehicleId: string, timestamp: string) => {
  const knex = getNextConnection()
  return await knex('stateLogs')
    .select()
    .where('vehicleId', vehicleId)
    .where('timestamp', '<=', timestamp)
    .orderBy('timestamp', 'desc')
    .first()
}

export {
  findStateLog
}
