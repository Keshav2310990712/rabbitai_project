const csv = require('csv-parser');
const xlsx = require('xlsx');
const { Readable } = require('stream');

exports.parseFile = (file) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const originalName = file.originalname.toLowerCase();

        if (originalName.endsWith('.csv')) {
            const stream = Readable.from(file.buffer);
            stream
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        } else if (originalName.endsWith('.xlsx')) {
            try {
                const workbook = xlsx.read(file.buffer, { type: 'buffer' });
                const sheetNameList = workbook.SheetNames;
                const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        } else {
            reject(new Error('Unsupported file format. Only .csv and .xlsx are allowed.'));
        }
    });
};
