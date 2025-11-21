# Your current structure should be:
maxclaim-rec-suite-site/
├── src/
│   ├── App.jsx (your pasted code)
│   ├── index.jsx
│   └── index.css (Tailwind)
├── public/
│   └── index.html
├── api/ (NEW - for serverless functions)
│   ├── claims.js
│   ├── ocr.js
│   └── upload.js
├── firebase.json
├── firestore.rules
├── storage.rules
├── package.json
├── vercel.json (NEW)
└── .env.local (gitignored)
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
