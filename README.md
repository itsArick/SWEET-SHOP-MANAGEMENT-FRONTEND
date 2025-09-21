# 🍭 Sweet Shop Management - Frontend

Frontend application for the **Sweet Shop Management System**, built with **React, TailwindCSS, and Context API**.  
This application provides user-facing features (login, register, sweets browsing, cart, orders) as well as admin dashboard pages.

## 🌐 Live Demo
- **Frontend**: [https://sweet-shop-management-frontend-peach.vercel.app/](https://sweet-shop-management-frontend-peach.vercel.app/)
- **Backend API**: [https://sweet-shop-management-backend-g45g.onrender.com/api](https://sweet-shop-management-backend-g45g.onrender.com/api)

---

## 🚀 Tech Stack
- **React (CRA)**
- **React Router v6**
- **TailwindCSS**
- **Axios (API requests)**
- **React Hot Toast (notifications)**
- **Lucide-react (icons)**
- **Context API (state management)**

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone <your-frontend-repo-url>
cd sweet-shop-frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the project root:

```env
# API endpoint (backend URL)
REACT_APP_API_URL=https://sweet-shop-management-backend-g45g.onrender.com/api

# App Info
REACT_APP_APP_NAME=Sweet Shop Management
REACT_APP_VERSION=1.0.0

# Development
REACT_APP_ENV=development
GENERATE_SOURCEMAP=true
```

### 4️⃣ Run the development server
```bash
npm start
```

The app will be available at: http://localhost:3000

---

## 📦 Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from CRA (irreversible)
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Card.js
│   │   └── ...
│   ├── layout/           # Layout components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Navigation.js
│   └── sweets/           # Sweet-specific components
│       ├── SweetCard.js
│       └── ...
├── contexts/             # React Context providers
│   ├── AuthContext.js
│   └── AppContext.js
├── hooks/                # Custom React hooks
│   ├── useAuth.js
│   ├── useForm.js
│   └── useSweets.js
├── pages/                # Page components
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── Sweets.js
│   └── admin/
├── services/             # API service functions
│   ├── api.js
│   ├── authService.js
│   └── sweetService.js
└── utils/                # Utility functions
    └── constants.js
```

---

## 🔑 Demo Credentials

```
Admin: admin@sweetshop.com / admin123
Admin: superadmin@sweetshop.com / super123
User:  user@sweetshop.com / user123
User:  test@sweetshop.com / test123
```

---

## 📌 Features

### 🔐 User Authentication
- User registration and login
- Profile management
- Password change functionality
- Role-based access control

### 🍬 Sweet Management
- Browse sweets with pagination
- Filter by category, price, availability
- Search functionality
- Featured sweets section
- Detailed sweet views

### 🛒 Shopping Features
- Add sweets to cart
- Purchase functionality
- Order history tracking
- Real-time stock updates

### 📊 Admin Dashboard
- Sweet management (CRUD operations)
- User management
- Analytics and statistics
- Inventory management
- Featured sweet management

### 🎨 UI/UX Features
- Responsive design (mobile-first)
- Toast notifications
- Loading states
- Error handling
- Form validation

---

## 🚀 Deployment

### Vercel Deployment (Current)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   ```
   REACT_APP_API_URL=https://sweet-shop-management-backend-g45g.onrender.com/api
   ```
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Upload build folder to your hosting service
```

---

## 🔧 Configuration

### Environment Variables
- `REACT_APP_API_URL`: Backend API endpoint
- `REACT_APP_APP_NAME`: Application name
- `REACT_APP_VERSION`: Application version
- `REACT_APP_ENV`: Environment (development/production)

### TailwindCSS Configuration
The project uses custom Tailwind configuration with:
- Custom color palette
- Extended spacing and sizing
- Custom components and utilities

---

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify `REACT_APP_API_URL` is correct
   - Check if backend service is running
   - Ensure CORS is properly configured on backend

2. **Authentication Issues**
   - Clear browser cache and localStorage
   - Check JWT token expiration
   - Verify credentials with demo accounts

3. **Rate Limiting Errors**
   - Wait 5-10 minutes between authentication attempts
   - Use different browser or incognito mode
   - Contact admin if persistent

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the backend API documentation
