# Python Integration Deployment Scripts

This folder contains scripts to easily deploy your React app to a Python project's static folder.

## Quick Start

### Option 1: PowerShell Script (Recommended for Windows)
```powershell
# Deploy to Python project (relative path)
.\deploy-to-python.ps1 "..\python-bot-example"

# Test build locally first
.\deploy-to-python.ps1 "..\python-bot-example" -Test
```

### Option 2: Batch File
```cmd
REM Deploy to Python project (relative path)
deploy-to-python.bat "..\python-bot-example"

REM Test build locally first
deploy-to-python.bat "..\python-bot-example" test
```

### Option 3: Manual Process
```bash
# 1. Build the project
npm run build

# 2. Test the build locally
npm run preview

# 3. Copy files to Python static folder
# Copy everything from dist/ to your_python_project/static/
```

## What the Scripts Do

1. **Build the React app** with production settings
2. **Verify asset paths** are correctly prefixed with `/static/`
3. **Create static directory** in your Python project if it doesn't exist
4. **Copy all build files** to the Python static folder
5. **Display integration instructions** for your Python server

## Build Verification

The scripts automatically check that your `index.html` contains asset references like:
```html
<script type="module" src="/static/assets/main-[hash].js"></script>
<link rel="stylesheet" href="/static/assets/main-[hash].css">
```

## Python Server Setup

After running the deployment script, configure your Python server:

### Flask Example
```python
from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')
```

### Django Example  
```python
# settings.py
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# urls.py
from django.views.generic import TemplateView
urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
]
```

### FastAPI Example
```python
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse('static/index.html')
```

## Troubleshooting

### Assets Not Loading
- Verify your Python server serves files from `/static/` URL path
- Check that all files were copied correctly
- Ensure your Python server has proper routing for static files

### Build Issues
- Run `npm run build:clean` to clean and rebuild
- Check that all environment variables are properly set
- Verify `vite.config.js` has `base: '/static/'` for production

## Testing Commands

```bash
# Test the built app locally
npm run test:build

# Build with analysis
npm run build:analyze

# Clean build
npm run build:clean
```
