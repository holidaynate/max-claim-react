# Your current structure should be:
maxclaim-rec-suite-site/
├── src/
│   ├── App.jsx (your React code)
│   ├── main.jsx
│   ├── index.css
│   └── config/
│       └── azure.js (Azure SDK config)
├── api/ (Azure Functions)
│   ├── claims/
│   │   └── index.js
│   ├── ocr/
│   │   └── index.js
│   ├── upload/
│   │   └── index.js
│   └── host.json
├── public/
│   └── index.html
├── staticwebapp.config.json
├── package.json
└── vite.config.js
# max-claim-react
react tailwind for azure to site
QUICK START COMMANDS
# 1. Install dependencies
npm install firebase @google-cloud/vision stripe

# 2. Initialize Firebase in your project
npm install -g firebase-tools
firebase login
firebase init

# 3. Deploy to Vercel
npm install -g vercel
vercel login
vercel

# 4. Set environment variables in Vercel dashboard
# VITE_FIREBASE_API_KEY
# VITE_FIREBASE_PROJECT_ID
# GOOGLE_APPLICATION_CREDENTIALS
Step 1: Create Azure Resources
# Install Azure CLI
# Windows: Download from https://aka.ms/installazurecliwindows
# Mac: brew install azure-cli

# Login
az login

# Create Resource Group
az group create --name maxclaim-rg --location eastus

# Create Cosmos DB account
az cosmosdb create \
  --name maxclaim-cosmos \
  --resource-group maxclaim-rg \
  --kind MongoDB \
  --enable-free-tier true

# Create Storage Account
az storage account create \
  --name maxclaimstorage \
  --resource-group maxclaim-rg \
  --sku Standard_LRS

# Create Cognitive Services
az cognitiveservices account create \
  --name maxclaim-vision \
  --resource-group maxclaim-rg \
  --kind ComputerVision \
  --sku F0 \
  --location eastus
Step 2: Create Azure Static Web App
# Create Static Web App linked to GitHub
az staticwebapp create \
  --name maxclaim-app \
  --resource-group maxclaim-rg \
  --source https://github.com/holidaynate/maxclaim-rec-suite-site \
  --location eastus2 \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "dist"
Step 3: Configure Custom Domain (GoDaddy)
In Azure Portal:
Go to your Static Web App
Click "Custom domains"
Add custom domain: max-claim.com
Azure will give you DNS records to add
In GoDaddy:
Go to DNS Management for max-claim.com
Add CNAME record:
Type: CNAME
Name: www
Value: [your-static-app].azurestaticapps.net
Add TXT record for verification (Azure provides this)
