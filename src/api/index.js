// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { firstName, lastName, email, message, company } = req.body;

    if (!firstName || !lastName || !email || !message || !company) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await resend.emails.send({
        from: 'chesneybuitendijk@chesney.dev',
        to: 'chesneybuitendijk@gmail.com',
        subject: `Bericht van ${firstName} ${lastName} via de website`,
        html: `<div>
                    <div>Naam: ${firstName} ${lastName}</div>
                    <div>Email: <a href="mailto:${email}">${email}</a></div>
                    <div>Bedrijf: ${company}</div>
                    <div>Bericht: ${message}</div>
                </div>`,
    });

    if (error) {
        return res.status(400).json({ error });
    }

    res.status(200).json({ data });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
