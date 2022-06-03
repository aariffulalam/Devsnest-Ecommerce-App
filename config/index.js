// require('dotenv').config()

const config = {
    // postgresUrl: process.env['DATABASE_URL'] || "postgresql://postgresql:password@localhost:5432/mydb?schema=public",
    twilio: {
        apiSID: process.env["TWILIO_SID"] || "",
        apiToken: process.env["TWILIO_TOKEN"] || "",
        from: process.env["TWILIO_FROM"] || ""
    }
}

module.exports = config;