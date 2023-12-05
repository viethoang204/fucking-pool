import { print, OutputType } from "../helpers/print.js";

export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username & passwword"
    static WRONG_CONNECTION_STRING = "Wrong connection string"
    static CANNOT_CONNECT_MONGODB = "Cannot connect to MongoDB"
    static USER_EXIST = "User already exists"
    constructor(message){
        super(message)
        print(message, OutputType.ERROR)
    }
}