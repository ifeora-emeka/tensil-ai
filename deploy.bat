@echo off
REM Deployment script for Fly.io on Windows

echo 🚀 Deploying Tensil AI to Fly.io...

REM Check if flyctl is installed
flyctl version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ flyctl is not installed. Please install it first:
    echo    https://fly.io/docs/hands-on/install-flyctl/
    exit /b 1
)

REM Check if user is logged in
flyctl auth whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Please log in to Fly.io first:
    flyctl auth login
    if %errorlevel% neq 0 exit /b 1
)

REM Build and deploy
echo 🔨 Building and deploying...
flyctl deploy

if %errorlevel% equ 0 (
    echo ✅ Deployment complete!
    echo 🌐 Your app should be available at: https://tensil-ai.fly.dev
) else (
    echo ❌ Deployment failed!
    exit /b 1
)
