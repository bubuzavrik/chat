import winston from 'winston'

const ENV = process.env.NODE_ENV || 'development'

export default function getLogger (module) {
  const path = module.filename.split('/').slice(-2).join('/')

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: (ENV === 'development') ? 'debug' : 'error',
        label: path
      })
    ]
  })
}
