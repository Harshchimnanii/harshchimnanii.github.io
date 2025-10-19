# 🚀 Deployment Guide for HarshChimnani.dev

This guide will help you deploy your portfolio and set up your custom domain `HarshChimnani.dev`.

## 📋 Prerequisites

1. **Domain Registration**: Purchase `HarshChimnani.dev` from a domain registrar like:
   - Namecheap
   - GoDaddy
   - Google Domains
   - Cloudflare

2. **GitHub Account**: For version control and deployment

3. **Hosting Platform Account**: Choose one of the options below

## 🎯 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- Automatic deployments from GitHub
- Built-in SSL certificates
- Global CDN
- Easy custom domain setup
- Free tier available

**Steps:**
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy automatically

3. **Add Custom Domain:**
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Add `HarshChimnani.dev`
   - Add `www.HarshChimnani.dev`

4. **DNS Configuration:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### Option 2: Netlify

**Steps:**
1. **Push to GitHub** (same as above)

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Choose your repository
   - Deploy automatically

3. **Add Custom Domain:**
   - Go to "Domain settings"
   - Add custom domain: `HarshChimnani.dev`
   - Netlify will provide DNS instructions

4. **DNS Configuration:**
   ```
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

### Option 3: GitHub Pages

**Steps:**
1. **Push to GitHub** (same as above)

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Save

3. **Add Custom Domain:**
   - In Pages settings, add `HarshChimnani.dev`
   - Create `CNAME` file in repository root:
     ```
     HarshChimnani.dev
     ```

4. **DNS Configuration:**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

## 🔧 Domain Configuration

### Step-by-Step DNS Setup

1. **Log into your domain registrar**
2. **Find DNS Management section**
3. **Add the following records:**

   **For Vercel:**
   ```
   Type: A
   Name: @
   Value: 76.76.19.61
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

   **For Netlify:**
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   ```

   **For GitHub Pages:**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

### SSL Certificate
- **Vercel**: Automatic SSL
- **Netlify**: Automatic SSL
- **GitHub Pages**: Automatic SSL

## 🚀 Quick Start Commands

```bash
# Initialize git repository
git init

# Add all files
git add .

# First commit
git commit -m "Initial portfolio commit"

# Set main branch
git branch -M main

# Add remote origin (replace with your GitHub URL)
git remote add origin https://github.com/yourusername/portfolio.git

# Push to GitHub
git push -u origin main
```

## 🔍 Testing Your Deployment

1. **Check your site is live:**
   - Visit your deployment URL
   - Test all features (photo upload, navigation, etc.)

2. **Test custom domain:**
   - Visit `HarshChimnani.dev`
   - Visit `www.HarshChimnani.dev`
   - Check SSL certificate is working

3. **Mobile testing:**
   - Test on different devices
   - Check responsive design

## 🛠️ Troubleshooting

### Common Issues:

1. **Domain not working:**
   - Wait 24-48 hours for DNS propagation
   - Check DNS records are correct
   - Verify domain is added to hosting platform

2. **SSL certificate issues:**
   - Wait for automatic SSL setup
   - Check domain is properly configured
   - Contact hosting support if needed

3. **Site not updating:**
   - Check if auto-deployment is enabled
   - Manually trigger deployment
   - Check for build errors

### Support Resources:
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **GitHub Pages**: [docs.github.com/pages](https://docs.github.com/pages)

## 📈 Performance Optimization

After deployment, consider:
1. **Image optimization** for uploaded photos
2. **CDN usage** (automatic with Vercel/Netlify)
3. **Caching headers** (already configured)
4. **Minification** (automatic with hosting platforms)

## 🎉 Success!

Once deployed, your portfolio will be available at:
- **Primary**: `https://HarshChimnani.dev`
- **WWW**: `https://www.HarshChimnani.dev`

Your space-themed portfolio is now live in the digital universe! 🚀
