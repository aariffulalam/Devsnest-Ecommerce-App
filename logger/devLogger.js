const {createLogger, format, transports} =require('winston');
const {printf, timestamp, combine} = format;

const logFormat = printf(({level, message, timestamp})=>{
    return `${timestamp}  -  ${level}:${message}`
})


const logger = createLogger({
    level:"debug",
    format:combine(
        format.colorize(),
        timestamp({format:"DD-MM-YYYY hh:mm:ss"}),
        logFormat
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename:"./logs/combine.devLogger.log"}),
        new transports.File({filename:"./logs/error.devLogger.log", level:"error"})
    ]
})

module.exports = logger;