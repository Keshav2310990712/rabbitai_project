# Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Create a Vercel Account
1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub (recommended) or email
3. Connect your GitHub account

### Step 2: Deploy Frontend
1. Visit [https://vercel.com/new](https://vercel.com/new)
2. Select your GitHub repository: `rabbitai_project`
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `sales-insight-automator/frontend`
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
4. Add Environment Variables:
   - `VITE_API_URL`: (Backend URL from Render - add after backend deployment)
5. Click "Deploy"

## Backend Deployment (Render)

### Step 1: Create a Render Account
1. Go to [https://render.com/register](https://render.com/register)
2. Sign up with GitHub (recommended)
3. Connect your GitHub account

### Step 2: Deploy Backend
1. Visit [https://dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Select your GitHub repository: `rabbitai_project`
4. Configure service:
   - **Name**: `sales-insight-backend`
   - **Root Directory**: `sales-insight-automator/backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `GOOGLE_API_KEY`: Your Google Generative AI key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - `NODE_ENV`: `production`
   - `PORT`: `8000`
   - `EMAIL_USER`: (Optional, for email notifications)
   - `EMAIL_PASSWORD`: (Optional, Gmail app password)
   - `EMAIL_TO`: (Optional)
   - `FRONTEND_URL`: Your Vercel frontend URL
6. Click "Create Web Service"

### Step 3: Get Backend URL
- Once deployed, copy the Render URL (e.g., https://sales-insight-backend.onrender.com)
- Go to Vercel dashboard → Your project → Settings → Environment Variables
- Update `VITE_API_URL` with your backend URL
- Redeploy frontend

## Environment Variables Setup

### Backend (.env file)
```
PORT=8000
NODE_ENV=production
GOOGLE_API_KEY=your_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_TO=recipient@email.com
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend Environment Variables (on Vercel)
```
VITE_API_URL=https://your-backend.onrender.com
```

## Useful Links
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com
- **GitHub Apps**: Manage connected apps in GitHub Settings
- **Google AI API**: https://aistudio.google.com/app/apikey

## Troubleshooting

### If frontend shows blank page:
- Check browser console for CORS errors
- Verify `VITE_API_URL` is correctly set
- Ensure backend URL is accessible

### If backend fails to start:
- Check environment variables are set
- Verify `GOOGLE_API_KEY` is valid
- Check Render logs for error details

### CORS Issues:
- Backend already has CORS enabled in `server.js`
- Update `FRONTEND_URL` environment variable with correct frontend URL
