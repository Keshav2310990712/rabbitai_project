const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

exports.generateSummary = async (data) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY is not set. Using dummy response.");
            return `## Executive Summary (Demo)\n\nThis is a dummy response because the Gemini API key is missing.\n\nKey Insights:\n- Top product sold was X.\n- Revenue increased by Y%.\n\n*Please configure GEMINI_API_KEY in .env to get actual AI summaries.*`;
        }

        // Sampling data to avoid token limits
        const previewData = data.slice(0, 150);
        //  console.log("Gemini key loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an expert Sales Analyst. I have provided some sales data. 
Please distill this data into a meaningful and professional executive summary. 
Include key insights, trends, and any noticeable patterns.
Format the output nicely using Markdown.
Data:
${JSON.stringify(previewData)}`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("AI Generation Error FULL:", error);
        console.error("Gemini Response:", error?.response?.data);
        throw error;
    }
};
