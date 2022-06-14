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
        format.json()
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename:"./logs/combine.prodLogger.log"}),
        new transports.File({filename:"./logs/error.prodLogger.log", level:"error"})
    ]
})

module.exports = logger;








// const {createLogger, format, transports} =require('winston');
// const {timestamp, combine} = format;


// const logger = createLogger({
//     level:"debug",
//     format:combine(timestamp({format:"DD-MM-YYYY hh:mm:ss"}, format.json()),
//     ),
//     transports:[
//         new transports.File({filename:"./logs/combine.prodLogger.log"}),
//         new transports.File({filename:"./logs/error.prodLogger.log", level:"error"})
//     ]
// })

// module.exports = logger;