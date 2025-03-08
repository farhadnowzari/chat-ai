const config = {
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
    host: process.env.APP_HOST ?? 'localhost',
}

export default config;