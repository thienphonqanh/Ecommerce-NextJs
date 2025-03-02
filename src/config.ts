import { z } from 'zod'
import fs from 'fs'
import path from 'path'

const chalk = (await import('chalk')).default
const checkEnv = async () => {
  if (!fs.existsSync(path.resolve('.env')) && !fs.existsSync(path.resolve('.env.local'))) {
    console.log(chalk.bgRed(`Cannot find .env environment file`))
    process.exit(1)
  }
}

checkEnv()

const configSchema = z.object({
  NEXT_PUBLIC_API_END_POINT: z.string().min(1, 'The API endpoint is required'),
  NEXT_PUBLIC_URL: z.string().min(1, 'The client URL is required')
})

const configProject = configSchema.safeParse(process.env)

if (!configProject.success) {
  configProject.error.errors.map((error) => {
    console.log({
      message: error.message,
      path: error.path.join('.')
    })
  })
  console.log(chalk.bgRed(`The declared values ​in the .env file are invalid!`))
  process.exit(1)
}

const envConfig = configProject.data

export default envConfig
