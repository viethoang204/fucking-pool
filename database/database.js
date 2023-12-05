import mongoose from "mongoose";
import { print, OutputType } from "../helpers/print.js";
mongoose.set('strictQuery',true)

async function connect() {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI)
        print('connect MongoDB successfully!!!', OutputType.SUCCESS)
        return connection
    } catch (error) {
        print('Connect MongoDB error', OutputType.ERROR)
        const {code} = error
        if(error.code = 'ENOTFOUND') {
            throw new Error('Wrong Connection string')
        } else {
            throw new Error('Cannot connect to MONGO')
        }
    }
}

export default connect
