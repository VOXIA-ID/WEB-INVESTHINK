# 🚀 DEPLOY INVESTHINK KE GITHUB PAGES

## ✅ Status: Siap Deploy!

Git repository sudah di-setup dan semua file sudah di-commit.  
**Tinggal push ke GitHub dan enable Pages!**

---

## 🎯 Cara Deploy (Pilih Salah Satu)

### 🟢 CARA PALING MUDAH - Gunakan Script Otomatis

```powershell
.\deploy-to-github.ps1
```

Script akan:
1. ✅ Check instalasi Git
2. ✅ Tanya username GitHub Anda
3. ✅ Tanya nama repository
4. ✅ Setup remote connection
5. ✅ Push ke GitHub
6. ✅ Beri instruksi enable GitHub Pages

**⏱️ Total waktu: 5 menit**

---

### 🟡 CARA MANUAL - Langkah demi Langkah

#### Step 1: Buat Repository di GitHub

**Buka di browser:**
```
https://github.com/new
```

**Isi form:**
- Repository name: `investhink`
- Description: `INVESTHINK - AI-Powered Crypto Trading Platform`
- Visibility: **Public** (untuk GitHub Pages gratis)
- ❌ JANGAN centang "Initialize with README"

**Klik:** `Create repository`

---

#### Step 2: Connect ke GitHub

**Di PowerShell (di folder project ini), jalankan:**

```powershell
# Ganti USERNAME dengan username GitHub Anda
git remote add origin https://github.com/USERNAME/investhink.git
git branch -M main
git push -u origin main
```

**Contoh lengkap jika username Anda "johndoe":**
```powershell
git remote add origin https://github.com/johndoe/investhink.git
git branch -M main
git push -u origin main
```

**⚠️ Akan diminta login:**
- Username: Masukkan username GitHub Anda
- Password: **HARUS PAKAI PERSONAL ACCESS TOKEN!** (bukan password biasa)

---

#### Step 3: Buat Personal Access Token (Jika Belum Punya)

**Buka:**
```
https://github.com/settings/tokens/new
```

**Setup:**
1. Note: `INVESTHINK Deploy`
2. Expiration: `90 days` (atau sesuai kebutuhan)
3. Select scopes: ✅ Centang **repo** (centang semua sub-options)
4. Klik: `Generate token`
5. **COPY TOKEN** dan simpan (tidak bisa dilihat lagi!)
6. Paste token sebagai password saat git push

---

#### Step 4: Enable GitHub Pages

**Buka di browser:**
```
https://github.com/USERNAME/investhink/settings/pages
```
(Ganti USERNAME dengan username GitHub Anda)

**Setup Pages:**
1. **Source:** Deploy from a branch
2. **Branch:** `main`
3. **Folder:** `/ (root)`
4. **Klik:** `Save`

**⏱️ Tunggu 1-2 menit untuk deployment...**

---

#### Step 5: Website Live! 🎉

**Setelah 1-2 menit, website Anda akan live di:**
```
https://USERNAME.github.io/investhink/
```

**Refresh halaman Settings > Pages untuk melihat status:**
- ✅ "Your site is published at..."

---

## 📊 Summary Commands

```powershell
# OTOMATIS (Recommended)
.\deploy-to-github.ps1

# ATAU MANUAL
git remote add origin https://github.com/USERNAME/investhink.git
git branch -M main
git push -u origin main
# Lalu enable Pages di Settings
```

---

## 🔄 Update Website (Setelah Deploy)

**Jika Anda edit file nanti:**

```powershell
git add .
git commit -m "Update: deskripsi perubahan"
git push
```

Website akan **auto-update** dalam 1-2 menit!

---

## 🐛 Troubleshooting

### ❌ "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/USERNAME/investhink.git
```

### ❌ "Permission denied" atau "Authentication failed"
- Pastikan pakai **Personal Access Token** sebagai password
- Buat token baru: https://github.com/settings/tokens/new
- Centang scope **repo**

### ❌ "Repository not found"
- Pastikan repository sudah dibuat di GitHub
- Cek nama repository sama persis
- Pastikan repository Public

### ❌ Website 404 setelah enable Pages
- Tunggu 2-3 menit (deployment butuh waktu)
- Refresh halaman Settings > Pages
- Clear browser cache: `Ctrl + Shift + R`

### ❌ CSS/JS tidak muncul di website
- Pastikan semua file ter-push (check di GitHub repository)
- Hard refresh browser: `Ctrl + Shift + R`
- Check Console browser (F12) untuk error

---

## 📚 Dokumentasi Lengkap

| File | Deskripsi |
|------|-----------|
| **DEPLOY_NOW.md** | Quick start guide |
| **GITHUB_PAGES_SETUP.md** | Detailed step-by-step |
| **deploy-to-github.ps1** | Automated script |
| **START_HERE.md** | Complete website guide |
| **DEPLOYMENT.md** | All hosting platforms |

---

## 🎓 Alternative: GitHub Desktop (GUI)

**Jika lebih suka interface visual:**

1. Download GitHub Desktop: https://desktop.github.com/
2. Install dan login dengan akun GitHub
3. Drag folder project ke GitHub Desktop
4. Klik "Publish repository"
5. Pilih Public
6. Enable Pages di web: https://github.com/USERNAME/investhink/settings/pages

---

## 💡 Pro Tips

### 1. Save Git Credentials
Agar tidak diminta login terus:
```powershell
git config --global credential.helper store
```

### 2. Check What's Pushed
```powershell
git log --oneline
```

### 3. View Remote URL
```powershell
git remote -v
```

### 4. Undo Last Commit (jika salah)
```powershell
git reset --soft HEAD~1
```

---

## 🌐 Setelah Website Live

### ✅ Test di berbagai device:
- Desktop
- Mobile
- Tablet

### ✅ Share URL:
```
https://USERNAME.github.io/investhink/
```

### ✅ Next steps:
- [ ] Add Google Analytics
- [ ] Submit to Google Search Console
- [ ] Setup custom domain (optional)
- [ ] Add SEO meta tags (sudah siap tinggal isi)
- [ ] Marketing campaign

---

## 📞 Butuh Bantuan?

### Dokumentasi:
- 📄 **DEPLOY_NOW.md** - Quick guide
- 📄 **GITHUB_PAGES_SETUP.md** - Detailed guide
- 📄 **START_HERE.md** - Complete overview

### Resources:
- GitHub Pages Docs: https://pages.github.com/
- Git Tutorial: https://git-scm.com/docs/gittutorial

---

## ⚡ Quick Deploy Checklist

- [ ] Git repository initialized ✅ (Already done!)
- [ ] Files committed ✅ (Already done!)
- [ ] Create GitHub repository
- [ ] Get Personal Access Token
- [ ] Push to GitHub
- [ ] Enable GitHub Pages
- [ ] Wait for deployment
- [ ] Test website
- [ ] Share URL!

---

## 🎉 Ready to Deploy?

### RUN THIS NOW:

```powershell
.\deploy-to-github.ps1
```

### Or follow manual steps above ☝️

---

**⏱️ Time Estimate:**
- Script: 5 minutes
- Manual: 6-8 minutes
- With GitHub Desktop: 8-10 minutes

**🎯 Your website will be live at:**
```
https://USERNAME.github.io/investhink/
```

---

**Good luck! 🚀 Website Anda akan segera online!**

**Created with ❤️ for Indonesian Crypto Community**
