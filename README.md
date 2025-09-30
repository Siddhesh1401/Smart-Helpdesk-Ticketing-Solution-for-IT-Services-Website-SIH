# Sahyog - Smart Support System

A modern, intelligent helpdesk ticketing solution designed for IT services with advanced features including AI-powered ticket classification, multi-source integration, and comprehensive dashboard analytics.

## 🚀 Features

### Core Functionality
- **Multi-Role Dashboard**: Separate interfaces for Employees, IT Staff, and Administrators
- **Smart Ticket Management**: Create, track, and manage support tickets with confidence scoring
- **AI-Powered Classification**: Automatic ticket categorization and priority assignment
- **Real-time Notifications**: Toast notifications and live updates

### Integration Capabilities
- **Multi-Source Support**: 
  - Chatbot integration
  - Email ticket creation
  - GLPI integration
  - SAP Solman connectivity
- **Knowledge Base**: Searchable articles and solutions
- **Email Integration**: Automated email handling and responses

### User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Role-Based Access**: Secure authentication with role-specific features
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Dark/Light Theme Support**: Adaptive design elements

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: ESLint, PostCSS
- **State Management**: React Hooks

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Siddhesh1401/Smart-Helpdesk-Ticketing-Solution-for-IT-Services-Website-SIH.git
   cd Smart-Helpdesk-Ticketing-Solution-for-IT-Services-Website-SIH
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build and Deployment

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

### Production Build
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🔐 Demo Credentials

For testing purposes, use these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Employee | john.doe@powergrid.com | Employee123 |
| IT Support | mike.chen@powergrid.com | IT123456 |
| Administrator | sarah.wilson@powergrid.com | Admin123 |

## 📱 User Roles & Features

### Employee Dashboard
- Submit new tickets
- Track ticket status
- View ticket history
- Access knowledge base

### IT Support Dashboard
- Manage assigned tickets
- Update ticket status
- Access diagnostic tools
- Monitor system health

### Admin Dashboard
- User management
- System analytics
- Configuration settings
- Reporting tools

## 🎯 Key Components

### Ticket Management
- **TicketList**: Display and filter tickets
- **TicketDetailPanel**: Detailed ticket view with actions
- **Ticket Creation**: Multi-step ticket submission

### Dashboard Widgets
- **MonitoringCard**: System health metrics
- **SourcesWidget**: Integration status monitoring
- **NotificationPanel**: Real-time alerts

### Authentication
- **Login**: Secure user authentication
- **Register**: New user registration
- **ForgotPassword**: Password recovery system

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_NAME=Sahyog
VITE_API_URL=your_api_url_here
VITE_ENABLE_DEMO_MODE=true
```

### Customization
- **Colors**: Modify `tailwind.config.js` for theme customization
- **API Endpoints**: Update service configurations in component files
- **Branding**: Replace logos and brand assets

## 📊 System Architecture

```
src/
├── components/          # React components
│   ├── dashboards/     # Role-specific dashboards
│   ├── auth/           # Authentication components
│   ├── tickets/        # Ticket management
│   └── common/         # Shared components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 SIH Project

This project was developed as part of the Smart India Hackathon (SIH) initiative, focusing on creating innovative solutions for IT service management and support systems.

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation wiki

---

**Sahyog** - Empowering efficient IT support through intelligent automation and user-centric design.