import { app } from './app.js'
import { config } from './utils/config.js'
import { logger } from './utils/logger.js'

app(config.MONGODB_URI).listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})
