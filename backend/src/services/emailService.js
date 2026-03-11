const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

exports.sendEmail = async (to, summary) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
             console.warn("Email credentials not set. Simulating email sending.");
             return true;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail', // Standard configuration for Gmail
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const htmlContent = `
            <h2>Sales Insight Automator - Executive Summary</h2>
            <p>Please find the generated summary below:</p>
            <hr/>
            <div style="white-space: pre-wrap; font-family: sans-serif;">
                ${summary.replace(/\\n/g, '<br/>')}
            </div>
            <br/><hr/>
            <p><em>Generated automatically by Sales Insight Automator.</em></p>
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: 'Your AI-Generated Sales Summary',
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Email Sending Error:", error);
        throw new Error('Failed to send email.');
    }
};
