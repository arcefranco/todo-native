import {config as dotenv} from 'dotenv'

dotenv()

const config = {
    host: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

export default config