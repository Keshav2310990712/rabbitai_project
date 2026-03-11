# The Sales Insight Automator

## Engineer's Log

The Sales Insight Automator is a secure, containerized application designed to process quarterly sales data (CSV/Excel) and email an AI-generated executive summary directly to the user.

### Features
- **Frontend**: A React SPA built with Vite and styled beautifully with TailwindCSS. Provides real-time feedback and Drag & Drop file uploads.
- **Backend**: An Express.js API integrating the Gemini LLM for insight generation and Nodemailer for delivery.
- **Security**: The backend includes robust measures:
  - `helmet`: Protects against well-known web vulnerabilities by setting appropriate HTTP headers.
  - `cors`: Restricts cross-origin requests.
  - `express-rate-limit`: Prevents abuse and DDoS attacks by capping request rates.
  - Input Validation: File type (only `.csv` and `.xlsx`) and size limits (max 10MB) via `multer`.

### Running Locally with Docker Compose

To spin up the entire environment locally without installing Node dependencies manually:

1. Clone the repository natively or inside a dev container.
2. Copy the `.env.example` in the `backend` folder to a new `.env` file and populate it with your real credentials:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Run the following command from the root directory:
   ```bash
   docker-compose up --build
   ```
4. Access the application:
   - **Frontend UI**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:5000](http://localhost:5000)
   - **API Documentation**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

### API Documentation (Swagger)

A live Swagger/OpenAPI endpoint is available when the backend is running.
Navigate to `http://localhost:5000/api-docs` to interactively test the endpoints independently of the frontend.

### CI/CD and Deployment

- A GitHub Action is configured to run on Pull Requests to `main`. It will install dependencies, lint the frontend, and run the production build process to validate integrity.
- **Deployment via Vercel (Frontend) and Render (Backend)**:
  - Connect your GitHub repository to Vercel, set the Root Directory to `frontend`.
  - Connect your GitHub repository to Render (Web Service), set Root Directory to `backend`, Build Command: `npm install`, Start Command: `npm start`. Set Env vars (`GEMINI_API_KEY`, `EMAIL_USER`, `EMAIL_PASS`).
