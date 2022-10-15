require('dotenv').config()
import Knex, { Knex as knexNs } from 'knex'
import { knexConfig } from '../../knexConfig'

let knex: knexNs

// Create the database
const createTestDatabase = async (database: any) => {
  const knex = Knex({
    client: 'pg',
    connection: {
      host: process.env.DB_TEST_HOST,
      database: undefined,
      port: 5400,
      password: process.env.TEST_PASS,
      user: process.env.TEST_USER
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: './src/test/migrations'
    }
  })

  try {
    await knex.raw(`DROP DATABASE IF EXISTS "${database}"`)
    await knex.raw(`CREATE DATABASE "${database}"`)
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  } finally {
    await knex.destroy()
  }
}

// Seed the database with schema and data
async function migrateTestDatabase(database: any) {
  const knex = Knex({
    client: 'pg',
    connection: {
      host: process.env.DB_TEST_HOST,
      database,
      port: 5400,
      password: process.env.TEST_PASS,
      user: process.env.TEST_USER
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      directory: './src/test/migrations'
    }
  })

  try {
    await knex.migrate.latest()
  } catch (err: any) {
    throw new Error(err)
  } finally {
    await knex.destroy()
  }
}

const globalSetUp = async (database: string) => {
  try {
    await createTestDatabase(database)
    await migrateTestDatabase(database)
    console.log('Test database created successfully')
    knex = knexConfig(database)
    return knex
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export {
  globalSetUp
}