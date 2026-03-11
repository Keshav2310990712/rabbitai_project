const express = require('express');
const multer = require('multer');
const { handleUpload } = require('../controllers/uploadController');

const router = express.Router();

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload sales data file and generate AI summary via email
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The .csv or .xlsx file to upload
 *               email:
 *                 type: string
 *                 description: Recipient's email address
 *     responses:
 *       200:
 *         description: Success message indicating the email is being sent
 *       400:
 *         description: Bad request (missing file or email)
 *       500:
 *         description: Internal server error
 */
router.post('/', upload.single('file'), handleUpload);

module.exports = router;
