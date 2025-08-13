# RevoltVoice Live - Deployment Guide

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. **Configure GitHub Repository Settings:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"

3. **Add Environment Variables (Secrets):**
   Go to your repository → Settings → Secrets and variables → Actions → New repository secret

   Add the following secret:
   - **Name:** `REACT_APP_GOOGLE_API_KEY`
   - **Value:** Your Google Gemini API key

### Environment Variables Required:

| Variable Name | Description | Where to Add |
|---------------|-------------|--------------|
| `REACT_APP_GOOGLE_API_KEY` | Google Gemini API key for AI functionality | GitHub Secrets |

### Deployment Process:

1. **Automatic Deployment:**
   - Every push to the `main` branch will trigger the deployment
   - The app will be built with your environment variables
   - It will be deployed to `https://yashdaga.github.io/RevoltVoice-Live`

2. **Manual Deployment:**
   - You can also manually trigger deployment from the Actions tab
   - Click "Run workflow" on the "Deploy RevoltVoice Live to GitHub Pages" workflow

### Local Development:

Create a `.env` file in the root directory with:
```
REACT_APP_GOOGLE_API_KEY=your_actual_api_key_here
```

### Manual Deployment (Alternative):

If you want to deploy manually without GitHub Actions:
```bash
npm run deploy
```

This will build and push the app to the `gh-pages` branch.

### Access Your App:

Once deployed, your app will be available at:
**https://yashdaga.github.io/RevoltVoice-Live**

### Troubleshooting:

1. **Build Fails:** Check if your API key is properly set in GitHub Secrets
2. **App Not Loading:** Ensure the homepage URL in package.json matches your repository name
3. **API Not Working:** Verify your Google API key has the correct permissions for Gemini API

### Notes:

- The app uses client-side routing, so it's compatible with GitHub Pages
- Make sure your Gemini API key has proper quotas and permissions
- The deployment process typically takes 2-5 minutes
