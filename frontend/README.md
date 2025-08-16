# 🔗 URL Shortener - "Gotta Short'em all!"

A modern, feature-rich URL shortening application built with React, Vite, and Supabase. Transform long URLs into clean, shareable links with comprehensive analytics and user management.

## 📹 Demo Video

<!-- Add your screen recording video here -->
<div align="center">
  <h3>🎥 Application Demo</h3>
  <p>📱 <em>Add your screen recording video here to showcase the application in action</em></p>
  
  <!-- Video placeholder - replace with your actual video -->
  <div style="background: #f0f0f0; border: 2px dashed #ccc; padding: 40px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 0; color: #666;">📹 Video Demo Placeholder</p>
    <p style="margin: 5px 0 0 0; font-size: 14px; color: #999;">
      <video >
    </p>
  </div>
</div>

## ✨ Features

### 🚀 Core Functionality

- **URL Shortening**: Convert long URLs to short, memorable links
- **Custom Aliases**: Create personalized short URLs
- **QR Code Generation**: Generate QR codes for easy sharing
- **Click Tracking**: Monitor link performance and engagement

### 📊 Analytics & Insights

- **Click Statistics**: Track total clicks and unique visitors
- **Device Analytics**: Monitor device types and operating systems
- **Geographic Data**: View visitor locations and countries
- **Real-time Updates**: Live dashboard with current statistics

### 🔐 User Management

- **Secure Authentication**: User registration and login system
- **Personal Dashboard**: Manage all your shortened links
- **Link History**: Access to previously created URLs
- **Profile Management**: Update account information

### 🎨 Modern UI/UX

- **Responsive Design**: Works seamlessly on all devices
- **Dark Theme**: Eye-friendly interface with modern aesthetics
- **Smooth Animations**: Enhanced user experience with motion
- **Accessibility**: Built with accessibility best practices

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions

### Backend & Database

- **Supabase** - Open-source Firebase alternative
- **PostgreSQL** - Robust relational database
- **Row Level Security** - Secure data access
- **Real-time subscriptions** - Live updates

### Development Tools

- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd url-shortener/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (buttons, inputs, etc.)
│   │   ├── create-link.jsx # URL creation form
│   │   ├── link-card.jsx   # Individual link display
│   │   └── ...
│   ├── pages/              # Application pages
│   │   ├── landing_page.jsx # Home page
│   │   ├── dashboard.jsx   # User dashboard
│   │   ├── auth.jsx        # Authentication
│   │   └── ...
│   ├── db/                 # Database operations
│   │   ├── supabase.js     # Supabase client
│   │   ├── apiUrls.js      # URL management API
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── context.jsx         # Global state management
│   └── layouts/            # Page layouts
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Set up the following tables:
   - `users` - User accounts
   - `urls` - Shortened URLs
   - `clicks` - Click tracking data
3. Configure Row Level Security policies
4. Set up authentication providers

### Environment Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Public anonymous key for client access

## 📱 Usage

### For End Users

1. **Shorten URLs**: Visit the landing page and paste any long URL
2. **Create Account**: Sign up to access your personal dashboard
3. **Manage Links**: View, edit, and delete your shortened URLs
4. **Track Performance**: Monitor clicks and visitor analytics

### For Developers

1. **Customization**: Modify components in the `src/components` directory
2. **Styling**: Update Tailwind classes or modify CSS in `src/App.css`
3. **Database**: Extend Supabase schema for additional features
4. **Deployment**: Deploy to Vercel, Netlify, or any static hosting service

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project: `npm run build`
2. Upload `dist` folder to your hosting service
3. Configure environment variables on your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend-as-a-service platform
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool

## 📞 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check the documentation
- Reach out to the development team

---

<div align="center">
  <p>Made with ❤️ by Swaraj</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
