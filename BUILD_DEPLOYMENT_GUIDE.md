# 🚀 Build & Deployment Guide

## 📁 **Environment Files Structure**
```
.env                    # Default/fallback (not committed)
.env.development        # Development settings
.env.staging           # Staging server settings  
.env.production        # Production server settings
.env.example           # Template for other developers
```

## 🛠️ **Build Commands**

### **Development Build**
```bash
npm run build:development
# Uses .env.development
# API: http://localhost:8000
```

### **Staging Build** 
```bash
npm run build:staging
# Uses .env.staging
# API: https://staging-api.your-domain.com
```

### **Production Build**
```bash
npm run build
# or
npm run build:production
# Uses .env.production  
# API: https://your-api-domain.com
```

## 🔄 **How Environment Variables Work in Build**

### **❌ What DOESN'T Work:**
- Environment variables are **NOT** runtime configurable
- You **CANNOT** change API URL after build
- `.env` files are **NOT** included in build output

### **✅ What WORKS:**
- Variables are **compiled into the bundle** at build time
- `import.meta.env.VITE_API_BASE_URL` becomes a **literal string**
- Different builds for different environments

### **Example Build Process:**

#### **Before Build (source code):**
```javascript
fetch(import.meta.env.VITE_API_BASE_URL + "/chat")
```

#### **After Build (compiled):**
```javascript
// Production build output:
fetch("https://your-api-domain.com" + "/chat")

// Development build output:  
fetch("http://localhost:8000" + "/chat")
```

## 🌐 **Deployment Strategies**

### **Strategy 1: Multiple Builds (Recommended)**
```bash
# Build for each environment
npm run build:staging    # Deploy to staging server
npm run build            # Deploy to production server
```

### **Strategy 2: Runtime Configuration**
If you need runtime configuration, use this approach:

1. **Create config.js in public folder:**
```javascript
// public/config.js
window.APP_CONFIG = {
  API_BASE_URL: 'https://api.example.com'
};
```

2. **Load in index.html:**
```html
<script src="/config.js"></script>
```

3. **Use in code:**
```javascript
const API_URL = window.APP_CONFIG?.API_BASE_URL || 'http://localhost:8000';
```

### **Strategy 3: Docker with Build Args**
```dockerfile
# Dockerfile
FROM node:18-alpine as build

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY . .
RUN npm install
RUN npm run build
```

```bash
# Build with different APIs
docker build --build-arg VITE_API_BASE_URL=https://prod-api.com -t myapp:prod .
docker build --build-arg VITE_API_BASE_URL=https://staging-api.com -t myapp:staging .
```

## 📦 **Production Deployment Checklist**

### **1. Update .env.production**
```bash
VITE_API_BASE_URL=https://your-actual-api-domain.com
VITE_APP_ENV=production
```

### **2. Build for Production**
```bash
npm run build
```

### **3. Test the Build**
```bash
npm run preview:production
```

### **4. Deploy dist/ Folder**
- Upload the `dist/` folder to your web server
- Configure your server to serve the files
- Set up proper routing for SPA

## 🔧 **Server Configuration**

### **Nginx Example**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;
    
    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### **Apache Example**
```apache
# .htaccess in dist folder
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
</filesMatch>
```

## 🚨 **Important Notes**

1. **Environment variables are PUBLIC** - don't put secrets in VITE_ variables
2. **Build once per environment** - you can't change API URL post-build
3. **Test your builds** before deploying
4. **Use HTTPS** in production
5. **Configure CORS** on your API server

## 🎯 **Quick Commands Reference**

```bash
# Development
npm run dev

# Build for production
npm run build

# Test production build locally
npm run preview:production

# Build for staging
npm run build:staging

# Lint code
npm run lint
```
