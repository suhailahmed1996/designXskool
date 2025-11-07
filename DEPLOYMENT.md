# Netlify Deployment Guide

## Quick Deploy Checklist

### 1. Environment Variables Setup

Before deploying, set up these environment variables in Netlify:

1. Go to **Site settings** → **Environment variables**
2. Add the following:

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB connection string (MongoDB Atlas recommended) |

### 2. Deploy to Netlify

#### Option A: Git Integration (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository to Netlify
3. Netlify will auto-detect `netlify.toml`
4. Deploy will happen automatically on push

#### Option B: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### 3. Verify Deployment

After deployment, test these endpoints:
- `https://your-site.netlify.app/api/hello` - Should return `{"message":"Hello from Node backend!"}`
- Submit the form on the landing page - Should save to MongoDB

## Project Structure

```
├── netlify/
│   └── functions/
│       └── server/
│           ├── server.js      # Express serverless function
│           └── package.json  # Function dependencies
├── src/                       # React frontend
├── netlify.toml               # Netlify configuration
└── package.json              # Frontend dependencies
```

## How It Works

1. **Frontend** (`src/App.tsx`) makes requests to `/api/students`
2. **Netlify redirect** (`netlify.toml`) routes `/api/*` to `/.netlify/functions/server/:splat`
3. **Serverless function** (`netlify/functions/server/server.js`) handles the request
4. **Express routes** process `/students` endpoint
5. **MongoDB** stores the data

## Troubleshooting

### Function not found
- Check that `netlify/functions/server/server.js` exists
- Verify `netlify.toml` has correct redirect pattern
- Check Netlify build logs for function deployment errors

### MongoDB connection errors
- Verify `MONGO_URI` environment variable is set in Netlify
- Check MongoDB Atlas IP whitelist (should allow all IPs or Netlify IPs)
- Ensure MongoDB connection string is correct format

### CORS errors
- CORS is already configured in the Express app
- If issues persist, check Netlify function logs

## Local Testing

Test the Netlify function locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local dev server with functions
netlify dev
```

This will:
- Start the Vite dev server
- Start the Netlify functions locally
- Proxy `/api/*` requests to the local function

