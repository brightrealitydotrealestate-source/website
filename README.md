# Bright Reality - Real Estate Platform

**Bright Reality** is a premium real estate web application designed to showcase available plots, villas, and property registration services in and around Chennai. The platform emphasizes a "Royal Earth" aesthetic with a gold and white theme, providing a seamless user experience for browsing properties and contacting the agency.

## 🚀 Live Demo

- **Website**: [https://www.kushibusy.in](https://www.kushibusy.in)

## ✨ Features

- **Modern & Responsive Design**: Built with a mobile-first approach, ensuring a stunning experience across all devices.
- **Dynamic Property Listings**: Showcase of available plots, villas, and apartments with detailed descriptions.
- **Interactive Gallery**: A custom-built lightbox gallery for viewing high-quality images and video tours.
- **Service Highlights**: Detailed sections for Property Sales, Documentation (Patta/EC), and Registration services.
- **Lead Generation**: Integrated contact forms that send data directly to Google Sheets and notify administrators via email.
- **SEO Optimized**: Full SEO implementation with dynamic metadata, structured data (Schema.org), sitemap, and robots.txt.
- **Performance**: Optimized for speed with lazy loading, asset optimization, and Vite's fast build process.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async)

## 📦 Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/bright-reality.git
    cd bright-reality
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```
    *Note: Use `--legacy-peer-deps` if you encounter dependency conflicts with React 19.*

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your specific configuration:
    ```env
    VITE_GOOGLE_APPS_SCRIPT_URL=your_google_script_url_here
    ```

4.  **Start the development server**
    ```bash
    npm run dev
    ```

## 🏗️ Build for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` folder, ready to be deployed to Vercel, Netlify, or any static hosting service.

## 🌐 Deployment

This project handles client-side routing. When deploying to static hosts (like Vercel/Netlify), ensure you have a rewrite rule pointing all traffic to `index.html`.

For generic servers, you may need to configure your web server (Nginx/Apache) to redirect 404s to `index.html`.

## 🤝 Contact

**Bright Reality**
- **Address**: No.62/2, 2nd Floor, South Sivan Koil Street, Vadapalani, Chennai - 600 026
- **Phone**: +91 98400 55492
- **Email**: brightrealityrealestate@gmail.com

---


Designed & Developed by [Xendral](https://xendral.in/)


© 2026 Bright Reality. All Rights Reserved.

