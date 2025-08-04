# Electronics Lab Inventory Management System (LIMS)

A comprehensive, modern web application for managing electronics lab inventory with real-time tracking, automated alerts, and role-based access control. Built with Next.js 14, TypeScript, and professional UI/UX design with Poppins font throughout.

![LIMS Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Professional+LIMS+Dashboard)

## ✨ Key Highlights

- **🎨 Professional Design**: Clean, business-grade interface with Poppins font
- **📱 Desktop-First Navigation**: Horizontal navigation optimized for desktop use
- **📊 Comprehensive Dataset**: 34+ realistic electronic components across 14 categories
- **⚡ Real-time Analytics**: Live dashboard with hydration-safe time updates
- **🔔 Smart Alerts**: Critical low stock and inactive inventory monitoring
- **👥 Role-Based Access**: Admin and User role management

## 🚀 Features

### Core Functionality
- **Component Management**: Complete CRUD operations for 34+ electronic components
- **Stock Transactions**: Inward/Outward stock management with detailed audit trails
- **Real-time Alerts**: Automated notifications for low stock and inactive components
- **Professional Dashboard**: Business-grade analytics with live time updates and interactive charts
- **User Management**: Role-based access control (Admin/User roles)
- **Advanced Search & Filter**: Multi-category filtering by component type, location, and stock levels
- **Comprehensive Inventory**: 14 categories including Resistors, Capacitors, ICs, Sensors, and more

### Technical Features
- **Professional UI/UX**: Business-grade design with Poppins font throughout
- **Responsive Design**: Desktop-first approach with mobile optimization
- **Hydration-Safe**: Fixed server-client rendering mismatches
- **Real-time Updates**: Context-based state management with live data
- **Professional Tables**: Clean data presentation with hover effects and status badges
- **Dark Mode Ready**: Toggle between light and dark themes
- **Export Ready**: Structured for easy data export functionality
- **API Ready**: Prepared for backend integration with complete endpoint structure

## 🛠 Tech Stack

- **Frontend**: Next.js 14.2.31, React 18, TypeScript
- **Styling**: Tailwind CSS with Poppins font, Professional UI components
- **Charts**: Recharts for interactive data visualization
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API with optimized performance
- **Typography**: Google Fonts (Poppins) for professional appearance
- **Authentication**: JWT-ready authentication system with role-based access
- **Design System**: Custom professional components with business-grade styling

## 📦 Component Categories & Inventory

The system includes **34 comprehensive electronic components** across **14 professional categories**:

### 🔧 **Component Categories**
1. **Resistors** (4 items) - 100Ω to 10kΩ, various wattages
2. **Capacitors** (3 items) - Ceramic, Electrolytic, Tantalum
3. **Inductors** (1 item) - Radial lead inductors
4. **Diodes** (2 items) - Rectifier and Zener diodes
5. **Transistors** (2 items) - BJT and MOSFET variants
6. **Integrated Circuits** (4 items) - Timers, Op-Amps, Microcontrollers
7. **Connectors** (2 items) - Headers and JST connectors
8. **Sensors** (2 items) - Temperature/Humidity and Light sensors
9. **Microcontrollers/Dev Boards** (2 items) - Arduino Uno R3, Raspberry Pi Zero W
10. **Switches/Buttons** (2 items) - Tactile and Slide switches
11. **LEDs/Displays** (2 items) - Standard LEDs and LCD displays
12. **Cables/Wires** (2 items) - Jumper wires and Hook-up wire
13. **Mechanical Parts** (2 items) - Screws and Standoffs
14. **Miscellaneous Lab Supplies** (4 items) - Solder, Breadboards, etc.

### 📊 **Realistic Data Features**
- **Price Range**: ₹0.50 to ₹1,200 (INR pricing)
- **Quantity Range**: 1 to 800 pieces per component
- **Location System**: Professional organization (Shelves, Bins, Drawers, Racks)
- **Manufacturer Info**: Real manufacturers (Arduino, Texas Instruments, Microchip, etc.)
- **Critical Low Stock**: Multiple items below threshold for testing alerts
- **Inactive Inventory**: Historical data for old stock detection

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **pnpm** (recommended for faster installs)
- **Git** (for cloning the repository)

### Check your versions:
```bash
node --version
npm --version
# or
pnpm --version
git --version
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/jayeshpatil6/Electronics-Lab-Inventory-Management-System.git
cd Electronics-Lab-Inventory-Management-System
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using pnpm (recommended - faster)
pnpm install

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
NEXT_PUBLIC_APP_VERSION="2.1.0"

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### 4. Start Development Server
```bash
# Using npm
npm run dev

# Using pnpm (recommended)
pnpm dev

# Or using yarn
yarn dev
```

### 5. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

**🎉 You should see the professional LIMS dashboard with Poppins font and 34+ components!**

## 🔐 Demo Credentials

Use these credentials to test the application:

### Admin Account
- **Email**: `admin@lab.com`
- **Password**: `password`
- **Access**: Full system access including user management and all inventory operations

### Regular User Account
- **Email**: `user@lab.com`
- **Password**: `password`
- **Access**: Inventory management and transaction viewing (no user management)

## 🎨 Design Features

### Professional UI/UX
- **Typography**: Poppins font throughout the entire application
- **Layout**: Desktop-first horizontal navigation with professional footer
- **Color Scheme**: Clean business-grade color palette
- **Components**: Professional white cards with subtle shadows and borders
- **Tables**: Clean data presentation with hover effects and status badges
- **Charts**: Interactive Recharts with business-appropriate styling

### Developer Credits
- **Footer**: Professional footer with "Made with ❤️ by Jayesh & Karan"
- **Branding**: J&K badge in gradient styling
- **Attribution**: Proper developer recognition throughout

## 📁 Project Structure

```
electronics-lims-frontend/
├── app/                          # Next.js App Router pages
│   ├── components/              # Component management pages
│   │   ├── page.tsx            # Components list with search/filter
│   │   ├── add/                # Add new component form
│   │   └── [id]/               # Component details and edit
│   ├── dashboard/               # Professional dashboard with analytics
│   │   └── page.tsx            # Main dashboard with 34+ components data
│   ├── login/                   # Authentication pages
│   ├── notifications/           # Notifications management
│   ├── register/                # User registration
│   ├── transactions/            # Stock transaction management
│   │   ├── inward/             # Inward stock transactions
│   │   └── outward/            # Outward stock transactions
│   ├── users/                   # User management (Admin only)
│   ├── globals.css              # Global styles with Poppins font
│   ├── layout.tsx               # Root layout with Poppins configuration
│   └── page.tsx                 # Professional home page
├── src/
│   ├── api/                     # API service layer
│   │   └── api.ts              # Complete API functions
│   ├── components/              # Reusable UI components
│   │   └── Layout.tsx          # Professional layout with desktop navigation
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.tsx     # Authentication state management
│   │   └── ComponentsContext.tsx # Components data with 34+ items
│   └── data/                    # Comprehensive mock data
│       └── components.ts        # 34 realistic electronic components
├── components/                  # shadcn/ui components
│   ├── ui/                     # Professional UI components
│   └── theme-provider.tsx      # Theme management
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── .env.local                   # Your environment variables (create this)
├── package.json                 # Dependencies with updated Next.js 14.2.31
├── tailwind.config.ts           # Tailwind CSS with Poppins font config
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This comprehensive documentation
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build optimized production bundle
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
npm run type-check   # Run TypeScript compiler checks

# Alternative with pnpm (faster)
pnpm dev            # Start development server
pnpm build          # Build for production
pnpm start          # Start production server

# Maintenance
npm run clean        # Clean build artifacts
npm audit            # Check for security vulnerabilities
npm update           # Update dependencies safely
```

## 🌐 API Integration

The application is fully structured for backend integration with comprehensive API endpoints:

### Authentication Endpoints
```typescript
POST /api/auth/login      # User authentication
POST /api/auth/register   # User registration
POST /api/auth/logout     # User logout
GET  /api/auth/me         # Get current user profile
POST /api/auth/refresh    # Refresh authentication token
```

### Components Endpoints
```typescript
GET    /api/components           # Get all components with pagination
POST   /api/components           # Create new component
GET    /api/components/:id       # Get specific component details
PUT    /api/components/:id       # Update component information
DELETE /api/components/:id       # Delete component
GET    /api/components/search    # Search components with filters
GET    /api/components/low-stock # Get components below minimum threshold
```

### Transactions Endpoints
```typescript
POST /api/transactions/inward    # Record inward stock transaction
POST /api/transactions/outward   # Record outward stock transaction
GET  /api/transactions           # Get transaction history
GET  /api/transactions/:id       # Get specific transaction details
GET  /api/transactions/summary   # Get transaction summary/analytics
```

### Users Endpoints (Admin only)
```typescript
GET    /api/users               # Get all users (Admin only)
POST   /api/users               # Create new user (Admin only)
PUT    /api/users/:id           # Update user information (Admin only)
DELETE /api/users/:id           # Delete user (Admin only)
PUT    /api/users/:id/role      # Update user role (Admin only)
```

### Analytics Endpoints
```typescript
GET /api/analytics/dashboard     # Get dashboard metrics
GET /api/analytics/trends        # Get inventory trends data
GET /api/analytics/categories    # Get category distribution
GET /api/analytics/alerts        # Get system alerts and notifications
```

## 📊 Comprehensive Sample Data

The application includes **34 realistic electronic components** with professional lab-grade data:

### 🔧 **Resistors Category**
- **Resistor (100 Ohm, 1/4W)** - 500 pieces, ₹0.50 each
- **Resistor (1k Ohm, 1/4W)** - 500 pieces, ₹0.50 each  
- **Resistor (10k Ohm, 1/4W)** - 500 pieces, ₹0.50 each
- **Resistor (4.7 Ohm, 1W)** - 150 pieces, ₹1.20 each

### ⚡ **Capacitors Category**
- **Ceramic Cap (0.1uF, 50V)** - 800 pieces, ₹0.80 each
- **Electrolytic Cap (100uF, 25V)** - 200 pieces, ₹2.50 each
- **Tantalum Cap (10uF, 16V)** - 100 pieces, ₹5.00 each

### 🔌 **Integrated Circuits**
- **NE555 Timer IC** - 80 pieces, ₹8.00 each
- **LM358 Op-Amp** - 100 pieces, ₹6.00 each
- **ATmega328P (DIP)** - 30 pieces, ₹150.00 each
- **ESP32-WROOM-32U** - 20 pieces, ₹200.00 each

### 🖥️ **Development Boards**
- **Arduino Uno R3** - 5 pieces, ₹800.00 each
- **Raspberry Pi Zero W** - 3 pieces, ₹1,200.00 each

### 📡 **Sensors**
- **DHT11 Temperature/Humidity** - 15 pieces, ₹50.00 each
- **Photoresistor (LDR)** - 30 pieces, ₹7.00 each

### 💡 **LEDs & Displays**
- **Red LED (5mm)** - 200 pieces, ₹0.80 each
- **16x2 LCD Display** - 10 pieces, ₹150.00 each

### 🔗 **Additional Categories**
- **Diodes, Transistors, Inductors, Connectors**
- **Switches/Buttons, Cables/Wires**  
- **Mechanical Parts, Lab Supplies**

### 📍 **Professional Organization**
- **Locations**: R-Shelf-A1, IC-Box-F1, Sensor-Bin-H1, etc.
- **Manufacturers**: Arduino, Texas Instruments, Microchip, Espressif
- **Part Numbers**: Industry-standard part numbering
- **Critical Stock Levels**: Realistic minimum thresholds for alerts

### 🚨 **Testing Scenarios**
- **Low Stock Items**: Components below minimum threshold
- **Inactive Inventory**: Historical items for old stock detection
- **Price Ranges**: From ₹0.50 to ₹1,200 for realistic scenarios

## 🎨 Customization

### Professional Styling
- **Typography**: Poppins font configured in `app/layout.tsx` and `tailwind.config.ts`
- **Global Styles**: Professional styling in `app/globals.css` with consistent font family
- **Color Scheme**: Business-grade color palette in `tailwind.config.ts`
- **Component Styles**: Professional white cards with subtle shadows and borders

### Layout Customization
- **Desktop Navigation**: Horizontal top navigation in `src/components/Layout.tsx`
- **Professional Footer**: Developer credits with J&K branding
- **Responsive Design**: Desktop-first approach with mobile optimization
- **Dark Mode**: Theme switching capability built-in

### Branding Customization
- **App Name**: Update in environment variables and layout components
- **Logo**: Replace logo and favicon in `public/` directory  
- **Developer Credits**: Modify footer attribution in Layout.tsx
- **Color Palette**: Customize brand colors in Tailwind configuration

### Data Customization
- **Component Data**: Modify `src/data/components.ts` for your inventory
- **Categories**: Add/modify component categories as needed
- **Locations**: Update location organization system
- **Pricing**: Adjust currency and pricing structure

### Feature Extensions
- **New Pages**: Add pages in the `app/` directory following Next.js 14 App Router
- **Additional Contexts**: Extend data management in `src/contexts/`
- **Custom Components**: Create reusable components in `src/components/`
- **API Integration**: Implement backend calls in `src/api/api.ts`

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_API_URL
# NEXT_PUBLIC_APP_NAME
# NEXT_PUBLIC_APP_VERSION
```

### Netlify
```bash
# Build the project
npm run build

# Deploy the build output to Netlify
# Configure build settings:
# Build command: npm run build
# Publish directory: .next
```

### Docker Deployment
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run Docker
```bash
# Build the image
docker build -t lims-frontend .

# Run the container
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=your-api-url lims-frontend
```

## 🔍 Troubleshooting

### Common Issues

**Hydration Errors (Server-Client Mismatch):**
```bash
# This has been fixed in the current version
# Time formatting is now hydration-safe with consistent formatting
# If you encounter issues, check the dashboard time display
```

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

# For pnpm users
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Build errors:**
```bash
# Check TypeScript errors
npm run type-check

# Clear Next.js cache
rm -rf .next
npm run build
```

**Font loading issues:**
```bash
# Poppins font is configured in multiple places:
# 1. app/globals.css (Google Fonts import)
# 2. app/layout.tsx (Next.js font configuration)  
# 3. tailwind.config.ts (Tailwind font family)
# Ensure all three are properly configured
```

### Performance Optimization

**Large bundle size:**
- Tree shaking is enabled in production builds
- Dynamic imports are used for heavy chart components
- Next.js Image optimization is configured for assets

**Slow loading with 34+ components:**
- Pagination is implemented for component lists
- Virtual scrolling can be added for very large datasets
- React.memo is used for expensive dashboard components

**Dashboard performance:**
- Charts are optimized with ResponsiveContainer
- Data calculations are memoized
- Context updates are optimized to prevent unnecessary re-renders

### Font Issues

**Poppins not loading:**
```bash
# Check network tab for font loading
# Verify Google Fonts import in globals.css
# Ensure Poppins is set as primary font in tailwind.config.ts
```

**Font fallback:**
```css
/* Fallback fonts are configured as: */
font-family: 'Poppins', Inter, system-ui, sans-serif;
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started
1. Fork the repository on GitHub
2. Clone your forked repository locally
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes with proper commit messages
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request with detailed description

### Development Guidelines
- **Code Style**: Follow TypeScript best practices and ESLint rules
- **Formatting**: Use Prettier for consistent code formatting
- **Commits**: Write meaningful commit messages following conventional commits
- **Testing**: Add tests for new features and bug fixes
- **Documentation**: Update README and inline documentation
- **Design**: Maintain professional UI/UX standards with Poppins font

### Code Quality Standards
```bash
# Before submitting PR, ensure:
npm run lint        # No ESLint errors
npm run type-check  # No TypeScript errors
npm run build       # Builds successfully
```

### Areas for Contribution
- **Backend Integration**: API implementation and database connectivity
- **Advanced Features**: Barcode scanning, advanced reporting
- **Performance**: Optimization for large datasets
- **Testing**: Unit tests, integration tests, E2E tests
- **Documentation**: Tutorials, API documentation, deployment guides
- **Accessibility**: WCAG compliance improvements

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Documentation

### 📚 Official Documentation
- **Next.js 14**: [Next.js App Router Documentation](https://nextjs.org/docs)
- **React 18**: [React Documentation](https://react.dev/)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Tailwind CSS**: [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- **Recharts**: [Recharts Documentation](https://recharts.org/en-US/)

### 🔧 Component Libraries
- **shadcn/ui**: [Component Documentation](https://ui.shadcn.com/)
- **Lucide Icons**: [Icon Library](https://lucide.dev/)
- **Google Fonts**: [Poppins Font](https://fonts.google.com/specimen/Poppins)

### 💬 Getting Help
- **Issues**: Create an issue for bugs or feature requests on GitHub
- **Discussions**: Use GitHub Discussions for questions and community support
- **Existing Issues**: Check existing issues before creating new ones
- **Bug Reports**: Provide detailed information including steps to reproduce

### 📧 Contact Information
- **Repository**: [Electronics-Lab-Inventory-Management-System](https://github.com/jayeshpatil6/Electronics-Lab-Inventory-Management-System)
- **Developer**: [@jayeshpatil6](https://github.com/jayeshpatil6)
- **Issues**: [GitHub Issues](https://github.com/jayeshpatil6/Electronics-Lab-Inventory-Management-System/issues)
- **Discussions**: [GitHub Discussions](https://github.com/jayeshpatil6/Electronics-Lab-Inventory-Management-System/discussions)

### 🐛 Bug Report Template
When reporting bugs, please include:
- **Environment**: OS, Node.js version, npm/pnpm version
- **Steps to Reproduce**: Clear step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Browser**: Browser name and version (for UI issues)

## 🎯 Roadmap & Future Development

### ✅ Phase 1 (Completed - Current Version)
- **✅ Professional UI/UX**: Clean business-grade interface with Poppins font
- **✅ Comprehensive Dataset**: 34+ realistic electronic components across 14 categories
- **✅ Desktop Navigation**: Horizontal navigation optimized for desktop use
- **✅ Dashboard Analytics**: Interactive charts with live time updates (hydration-safe)
- **✅ User Authentication**: Role-based access control (Admin/User)
- **✅ Stock Management**: Complete CRUD operations for inventory
- **✅ Professional Footer**: Developer credits with J&K branding
- **✅ Real-time Alerts**: Critical low stock and inactive inventory monitoring

### 🔄 Phase 2 (In Progress)
- **🔄 Backend Integration**: REST API implementation with database connectivity
- **🔄 Real-time Notifications**: WebSocket-based live notifications
- **🔄 Advanced Reporting**: PDF/Excel export functionality
- **🔄 Barcode Integration**: QR code generation and scanning capabilities
- **🔄 Audit Trails**: Complete transaction history and change logs
- **🔄 Advanced Analytics**: Trend analysis and predictive insights

### 📋 Phase 3 (Planned)
- **📋 Mobile App**: React Native mobile application
- **📋 Advanced Search**: Elasticsearch integration for complex queries  
- **📋 Multi-location Support**: Multiple lab/warehouse management
- **📋 Integration APIs**: ERP system integration capabilities
- **📋 Advanced Security**: 2FA, OAuth integration, role permissions
- **📋 Performance Optimization**: Caching, CDN integration, optimization

### 🚀 Phase 4 (Future Vision)
- **🚀 AI/ML Features**: Predictive analytics for stock management
- **🚀 IoT Integration**: Sensor-based inventory tracking
- **🚀 Supply Chain**: Automated vendor management and purchasing
- **🚀 Global Deployment**: Multi-tenant SaaS platform
- **🚀 Enterprise Features**: Advanced workflow automation
- **🚀 Blockchain**: Supply chain transparency and authenticity

### � Technology Evolution
- **Next.js**: Stay updated with latest versions and features
- **Database**: PostgreSQL/MongoDB integration with Prisma ORM
- **Authentication**: Auth0 or Firebase Auth integration
- **Real-time**: Socket.io or WebSocket implementation
- **Testing**: Jest, Cypress, and Playwright test suites
- **DevOps**: CI/CD pipeline with Docker and Kubernetes

## 🙏 Acknowledgments

### 🛠️ **Core Technologies**
- **[Next.js](https://nextjs.org/)** - The React framework for production-grade applications
- **[React](https://react.dev/)** - The library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development

### 🎨 **Design & UI**
- **[Google Fonts (Poppins)](https://fonts.google.com/specimen/Poppins)** - Professional typography
- **[Lucide React](https://lucide.dev/)** - Beautiful and consistent icons
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible UI components
- **[Recharts](https://recharts.org/)** - Composable charting library for React

### 🌟 **Special Recognition**
- **Electronics Lab Community** - For inspiration and real-world requirements
- **Open Source Contributors** - For the amazing tools and libraries
- **GitHub** - For providing excellent development platform and CI/CD
- **Vercel** - For seamless deployment and hosting solutions

### 👥 **Development Team**
- **Jayesh** - Lead Developer & UI/UX Design
- **Karan** - Co-Developer & System Architecture
- **Community Contributors** - For feedback and improvements

### 📚 **Educational Resources**
- **Next.js Documentation Team** - For comprehensive guides and examples
- **Tailwind CSS Team** - For utility-first CSS methodology
- **React Team** - For continuous innovation in web development
- **TypeScript Team** - For making JavaScript development more robust

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### MIT License Summary
- ✅ **Commercial Use** - Use in commercial projects
- ✅ **Modification** - Modify the source code
- ✅ **Distribution** - Distribute the software
- ✅ **Private Use** - Use for private projects
- ❌ **Liability** - No warranty or liability
- ❌ **Trademark Use** - No trademark rights included

---

## 🎉 **Made with ❤️ for Electronics Labs Everywhere**

### 🚀 **Get Started Today**
```bash
git clone https://github.com/jayeshpatil6/Electronics-Lab-Inventory-Management-System.git
cd Electronics-Lab-Inventory-Management-System
pnpm install
pnpm dev
```

### 🌐 **Links**
- **📖 Live Demo**: [Coming Soon]
- **📚 Documentation**: [GitHub Wiki](https://github.com/jayeshpatil6/Electronics-Lab-Inventory-Management-System/wiki)
- **🐛 Issues**: [Report Bugs](https://github.com/jayeshpatil6/Electronics-Lab-Inventory-Management-System/issues)
- **💬 Discussions**: [Community](https://github.com/jayeshpatil6/Electronics-Lab-Inventory-Management-System/discussions)

### 📊 **Project Stats**
- **📦 Components**: 34+ realistic electronic components
- **📁 Categories**: 14 comprehensive categories  
- **💰 Price Range**: ₹0.50 to ₹1,200 (INR)
- **🎨 Design**: Professional business-grade UI with Poppins font
- **📱 Responsive**: Desktop-first with mobile optimization
- **⚡ Performance**: Optimized with Next.js 14.2.31

**Transform your electronics lab inventory management today! 🔬✨**