# INVESTHINK - Deploy to GitHub Pages Script
# This script automates the deployment process

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "║        🚀 INVESTHINK - GitHub Pages Deployment 🚀         ║" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

# Check if git is installed
Write-Host "`n📋 Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first:" -ForegroundColor Red
    Write-Host "   Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit
}

# Check current git status
Write-Host "`n📋 Checking Git repository status..." -ForegroundColor Yellow
$gitStatus = git status 2>&1

if ($gitStatus -match "not a git repository") {
    Write-Host "❌ Not a git repository. Initializing..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: INVESTHINK website"
    Write-Host "✅ Git repository initialized and committed" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

# Get GitHub username
Write-Host "`n📝 GitHub Account Setup" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
$username = Read-Host "Enter your GitHub username"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Username cannot be empty!" -ForegroundColor Red
    exit
}

# Get repository name
Write-Host "`n📝 Repository Name" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
$repoName = Read-Host "Enter repository name (default: investhink)"

if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "investhink"
}

# Confirm details
Write-Host "`n📊 Deployment Configuration" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "GitHub Username  : $username" -ForegroundColor White
Write-Host "Repository Name  : $repoName" -ForegroundColor White
Write-Host "Repository URL   : https://github.com/$username/$repoName" -ForegroundColor White
Write-Host "Website URL      : https://$username.github.io/$repoName/" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan

$confirm = Read-Host "`nIs this correct? (y/n)"

if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "❌ Deployment cancelled." -ForegroundColor Red
    exit
}

# Check if remote already exists
Write-Host "`n🔗 Setting up remote repository..." -ForegroundColor Yellow
$remotes = git remote 2>&1

if ($remotes -match "origin") {
    Write-Host "⚠️  Remote 'origin' already exists. Removing..." -ForegroundColor Yellow
    git remote remove origin
}

# Add remote
$remoteUrl = "https://github.com/$username/$repoName.git"
git remote add origin $remoteUrl
Write-Host "✅ Remote added: $remoteUrl" -ForegroundColor Green

# Ensure we're on main branch
Write-Host "`n🌿 Setting up main branch..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branch set to 'main'" -ForegroundColor Green

# Display next steps
Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║              📋 NEXT STEPS - PLEASE FOLLOW                ║" -ForegroundColor Yellow
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`n🔴 IMPORTANT: Create GitHub Repository First!" -ForegroundColor Red
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "1. Open browser and go to:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Green
Write-Host "`n2. Fill in the details:" -ForegroundColor White
Write-Host "   - Repository name: $repoName" -ForegroundColor Yellow
Write-Host "   - Description: INVESTHINK - AI-Powered Crypto Trading Platform" -ForegroundColor Yellow
Write-Host "   - Visibility: Public (for free GitHub Pages)" -ForegroundColor Yellow
Write-Host "   - DO NOT check 'Initialize with README'" -ForegroundColor Red
Write-Host "`n3. Click 'Create repository'" -ForegroundColor White

Write-Host "`n════════════════════════════════════════════════════════════" -ForegroundColor Cyan
$created = Read-Host "Have you created the repository on GitHub? (y/n)"

if ($created -ne "y" -and $created -ne "Y") {
    Write-Host "`n⏸️  Please create the repository first, then run this script again." -ForegroundColor Yellow
    Write-Host "Or manually run: git push -u origin main" -ForegroundColor Yellow
    exit
}

# Push to GitHub
Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "⚠️  You may be asked for credentials:" -ForegroundColor Yellow
Write-Host "   - Username: Your GitHub username" -ForegroundColor White
Write-Host "   - Password: Use Personal Access Token (not regular password!)" -ForegroundColor Red
Write-Host "`n💡 Don't have a token? Create one:" -ForegroundColor Yellow
Write-Host "   https://github.com/settings/tokens/new" -ForegroundColor Green
Write-Host "   - Note: INVESTHINK Deploy" -ForegroundColor White
Write-Host "   - Expiration: 90 days (or custom)" -ForegroundColor White
Write-Host "   - Scopes: Check 'repo'" -ForegroundColor White
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Read-Host "`nPress Enter to continue with push"

try {
    git push -u origin main
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║                  🎉 ALMOST DONE! 🎉                        ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    
    Write-Host "`n📝 Final Step: Enable GitHub Pages" -ForegroundColor Yellow
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "1. Open: https://github.com/$username/$repoName/settings/pages" -ForegroundColor Green
    Write-Host "`n2. Under 'Build and deployment':" -ForegroundColor White
    Write-Host "   - Source: Deploy from a branch" -ForegroundColor Yellow
    Write-Host "   - Branch: main" -ForegroundColor Yellow
    Write-Host "   - Folder: / (root)" -ForegroundColor Yellow
    Write-Host "   - Click 'Save'" -ForegroundColor Yellow
    Write-Host "`n3. Wait 1-2 minutes for deployment" -ForegroundColor White
    Write-Host "`n4. Your website will be live at:" -ForegroundColor White
    Write-Host "   https://$username.github.io/$repoName/" -ForegroundColor Green -BackgroundColor Black
    
    Write-Host "`n════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    
    # Ask to open browser
    $openBrowser = Read-Host "`nOpen GitHub Pages settings in browser? (y/n)"
    if ($openBrowser -eq "y" -or $openBrowser -eq "Y") {
        Start-Process "https://github.com/$username/$repoName/settings/pages"
        Write-Host "✅ Browser opened!" -ForegroundColor Green
    }
    
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║               ✨ DEPLOYMENT SUCCESSFUL! ✨                ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    
    Write-Host "`n📌 Save These URLs:" -ForegroundColor Yellow
    Write-Host "Repository  : https://github.com/$username/$repoName" -ForegroundColor White
    Write-Host "Settings    : https://github.com/$username/$repoName/settings/pages" -ForegroundColor White
    Write-Host "Live Site   : https://$username.github.io/$repoName/" -ForegroundColor Green
    
    Write-Host "`n🎉 Congratulations! Your website will be live soon!" -ForegroundColor Green
    
} catch {
    Write-Host "`n❌ Error during push:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "`n💡 Common solutions:" -ForegroundColor Yellow
    Write-Host "1. Make sure repository exists on GitHub" -ForegroundColor White
    Write-Host "2. Use Personal Access Token as password" -ForegroundColor White
    Write-Host "3. Check internet connection" -ForegroundColor White
    Write-Host "`n📖 For detailed help, read: GITHUB_PAGES_SETUP.md" -ForegroundColor Cyan
}

Write-Host "`n════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
