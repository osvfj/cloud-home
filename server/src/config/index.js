require('dotenv').config()

module.exports = {
    HOME_DIR_CLOUD: process.env.HOME_DIR_CLOUD,
    PORT: process.env.PORT,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN
}