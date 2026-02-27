# My React App

A modern React application built with Vite, featuring a beautiful UI and component-based architecture.

## 🚀 Features

- ⚡ **Lightning Fast**: Built with Vite for instant HMR and fast builds
- 🎨 **Modern UI**: Beautiful gradients, animations, and responsive design
- 📱 **Mobile First**: Fully responsive design that works on all devices
- 🔧 **Developer Experience**: ESLint configuration and modern tooling
- 🧩 **Component Based**: Modular components for easy maintenance
- 🎯 **Production Ready**: Optimized build and deployment ready

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with gradients and animations
- **ESLint** - Code quality and consistency

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🏗️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation header
│   ├── Counter.jsx     # Interactive counter component
│   └── Footer.jsx      # Footer component
├── assets/             # Static assets
├── App.jsx             # Main application component
├── App.css             # Main application styles
├── index.css           # Global styles
└── main.jsx            # Application entry point
```

## 🎨 Components

### Header
- Responsive navigation with gradient background
- Mobile-friendly design

### Counter
- Interactive counter with increment, decrement, and reset
- Beautiful animations and hover effects

### Footer
- Multi-column layout with links
- Social media integration ready

## 🚀 Deployment

### Netlify Deployment

This project is configured for Netlify deployment with serverless functions.

#### Prerequisites
1. A Netlify account
2. MongoDB database (MongoDB Atlas recommended for production)

#### Steps to Deploy

1. **Build the project locally (optional, for testing):**
```bash
npm run build
```

2. **Set up environment variables in Netlify:**
   - Go to your Netlify site dashboard
   - Navigate to Site settings → Environment variables
   - Add `MONGO_URI` with your MongoDB connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/design-codex`

3. **Deploy to Netlify:**
   - Connect your repository to Netlify
   - Netlify will automatically detect the `netlify.toml` configuration
   - The build command `npm run build` will run automatically
   - Functions will be deployed from `netlify/functions/`

#### Project Structure for Netlify

```
netlify/
└── functions/
    └── server/
        ├── server.js      # Express serverless function
        └── package.json   # Function dependencies
```

#### API Endpoints

- `POST /api/students` - Submit student application
- `GET /api/students` - Get all students (for admin use)
- `GET /api/hello` - Health check endpoint

The frontend automatically uses `/api/students` which is redirected to the Netlify function via `netlify.toml`.

#### Local Development

For local development with the server:

```bash
# Terminal 1: Start the Express server
cd server
npm install
npm start

# Terminal 2: Start the Vite dev server
npm run dev
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the linter: `npm run lint`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).