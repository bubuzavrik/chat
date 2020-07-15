import path from 'path'
import nconf from 'nconf'

nconf.argv().env().file({ file: path.resolve(__dirname, 'config.json') })

export default nconf
