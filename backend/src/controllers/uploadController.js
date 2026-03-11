const { parseFile } = require('../utils/fileParser');
const { generateSummary } = require('../services/aiService');
const { sendEmail } = require('../services/emailService');

exports.handleUpload = async (req, res, next) => {
    try {
        const file = req.file;
        const email = req.body.email;

        if (!file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }
        if (!email) {
            return res.status(400).json({ success: false, message: 'Recipient email is required.' });
        }

        // 1. Parse File
        let parsedData;
        try {
            parsedData = await parseFile(file);
        } catch (error) {
            return res.status(400).json({ success: false, message: 'Error parsing file. Ensure it is a valid .csv or .xlsx' });
        }

        // 2. Generate Summary via AI
        const summary = await generateSummary(parsedData);

        // 3. Send Email
        await sendEmail(email, summary);

        res.status(200).json({ 
            success: true, 
            message: 'Summary generated and emailed successfully.',
            summary 
        });

    } catch (error) {
        next(error);
    }
};
