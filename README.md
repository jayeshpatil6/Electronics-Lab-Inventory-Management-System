# Electronics Lab Inventory Management System (LIMS)

A comprehensive, modern web application for managing electronics lab inventory with real-time tracking, automated alerts, and role-based access control.

![LIMS Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=LIMS+Dashboard)

## 🚀 Features

### Core Functionality
- **Component Management**: Complete CRUD operations for electronic components
- **Stock Transactions**: Inward/Outward stock management with audit trails
- **Real-time Alerts**: Automated notifications for low stock and inactive components
- **Dashboard Analytics**: Interactive charts and key performance indicators
- **User Management**: Role-based access control (Admin/User roles)
- **Search & Filter**: Advanced filtering by category, location, and stock levels

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Context-based state management
- **Form Validation**: Comprehensive client-side validation
- **Dark Mode**: Toggle between light and dark themes
- **Export Ready**: Structured for easy data export functionality
- **API Ready**: Prepared for backend integration

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Axios (configured for API integration)
- **Authentication**: JWT-ready authentication system

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn** (version 1.22 or higher)
- **Git** (for cloning the repository)

### Check your versions:
```bash
node --version
npm --version
git --version
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/electronics-lims-frontend.git
cd electronics-lims-frontend
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

Add the following environment variables:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# App Configuration
NEXT_PUBLIC_APP_NAME="Electronics LIMS"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### 4. Start Development Server
```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

### 5. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

Use these credentials to test the application:

### Admin Account
- **Email**: `admin@lab.com`
- **Password**: `password`
- **Access**: Full system access including user management

### Regular User Account
- **Email**: `user@lab.com`
- **Password**: `password`
- **Access**: Inventory management only

## 📁 Project Structure

```
electronics-lims-frontend/
├── app/                          # Next.js App Router pages
│   ├── components/              # Component management pages
│   ├── dashboard/               # Dashboard page
│   ├── login/                   # Authentication pages
│   ├── notifications/           # Notifications page
│   ├── transactions/            # Stock transaction pages
│   ├── users/                   # User management pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── src/
│   ├── api/                     # API service layer
│   │   └── api.ts              # API functions
│   ├── components/              # Reusable components
│   │   └── Layout.tsx          # Main layout component
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx     # Authentication context
│   │   └── ComponentsContext.tsx # Components data context
│   └── data/                    # Mock data
│       └── components.ts        # Sample component data
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── .env.local                   # Your environment variables (create this)
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler

# Maintenance
npm run clean        # Clean build artifacts
npm audit            # Check for vulnerabilities
npm update           # Update dependencies
```

## 🌐 API Integration

The application is structured for easy backend integration. Update the API endpoints in `src/api/api.ts`:

### Authentication Endpoints
```typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET  /api/auth/me
```

### Components Endpoints
```typescript
GET    /api/components
POST   /api/components
GET    /api/components/:id
PUT    /api/components/:id
DELETE /api/components/:id
```

### Transactions Endpoints
```typescript
POST /api/transactions/inward
POST /api/transactions/outward
GET  /api/transactions
```

### Users Endpoints (Admin only)
```typescript
GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

## 📊 Sample Data

The application includes realistic sample data for:
- **6 Electronic Components**: Arduino, resistors, capacitors, LEDs, etc.
- **Multiple Categories**: Microcontrollers, Resistors, Capacitors, LEDs, etc.
- **Various Locations**: Shelves, drawers, cabinets
- **Stock Levels**: Including low stock scenarios for testing alerts

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for custom colors and themes
- Update `app/globals.css` for global styles
- Component-specific styles are in individual files

### Branding
- Update logo and favicon in `public/` directory
- Modify app name in environment variables
- Customize color scheme in Tailwind config

### Features
- Add new pages in the `app/` directory
- Extend contexts for additional data management
- Create new components in `src/components/`

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Netlify
```bash
# Build the project
npm run build

# Deploy the 'out' folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔍 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Check TypeScript errors
npm run type-check

# Clear Next.js cache
rm -rf .next
npm run build
```

### Performance Optimization

**Large bundle size:**
- Enable tree shaking in production
- Use dynamic imports for heavy components
- Optimize images with Next.js Image component

**Slow loading:**
- Implement pagination for large datasets
- Add loading skeletons
- Use React.memo for expensive components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Getting Help
- Create an issue for bugs or feature requests
- Check existing issues before creating new ones
- Provide detailed information when reporting bugs

### Contact
- **Email**: support@yourdomain.com
- **GitHub**: [@your-username](https://github.com/your-username)
- **LinkedIn**: [Your Name](https://linkedin.com/in/your-profile)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core inventory management
- ✅ User authentication and authorization
- ✅ Dashboard with analytics
- ✅ Stock transaction management

### Phase 2 (Planned)
- 🔄 Backend API integration
- 🔄 Real-time notifications
- 🔄 Advanced reporting
- 🔄 Barcode scanning

### Phase 3 (Future)
- 📋 Mobile app
- 📋 Advanced analytics
- 📋 Integration with procurement systems
- 📋 Multi-location support

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Recharts](https://recharts.org/) for the charting library
- The open-source community for inspiration and tools

---

**Made with ❤️ for Electronics Labs Everywhere**

For more information, visit our [documentation](https://your-docs-site.com) or [live demo](https://your-demo-site.com).
