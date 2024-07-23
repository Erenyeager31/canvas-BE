import morgan from "morgan";
import fs from "fs";
import path from "path";
import { Request } from "express";

// check and create a file stream for the log directory if it does not exists already
const logDirectory = path.join(__dirname,'../log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = fs.createWriteStream(path.join(logDirectory,'access.log'))

// a custom token to extract sesisonID
morgan.token('sessionID',(req:Request)=>{
    if(req?.cookies){
        const sessionID = req?.cookies['sessionID']
        return sessionID
    }
    return 'No sessionID'
})

const format = ':remote-addr :method :url :status :res[content-length] - :response-time ms :sessionID';

const logger = morgan(format, { stream: accessLogStream });

export default logger;
