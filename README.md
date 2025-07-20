# AI Travel Planner 🧳✈️

An intelligent travel planning application leveraging AI agents to create personalized trip itineraries, recommend destinations, and optimize travel budgets.

## 🏗️ Project Architecture

### **Multi-Agent System**
- **Master Coordinator Agent**: Orchestrates the entire planning process
- **Specialized Agents**: Hotel, Food, Activity, Transportation, Budget, Weather, Culture
- **Intelligent Coordination**: Agents work together to create cohesive travel experiences

### **Tech Stack**
- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express, PostgreSQL
- **AI**: OpenAI GPT API integration
- **Real-time**: Socket.io for live collaboration
- **Maps**: Google Maps/Mapbox integration
- **Deployment**: Docker containerization, Cloud deployment

## 📁 Project Structure

```
AI-Travel-Planner/
├── frontend/                    # React Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Shared components
│   │   │   ├── forms/          # Form components
│   │   │   ├── layout/         # Layout components
│   │   │   └── ui/             # UI elements
│   │   ├── pages/              # Page components
│   │   │   ├── auth/           # Authentication pages
│   │   │   ├── dashboard/      # Dashboard pages
│   │   │   ├── planner/        # Trip planning pages
│   │   │   └── profile/        # User profile pages
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # React context providers
│   │   ├── services/           # API service layer
│   │   ├── utils/              # Utility functions
│   │   ├── types/              # TypeScript interfaces
│   │   └── styles/             # CSS and styling
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── backend/                     # Node.js Backend API
│   ├── src/
│   │   ├── agents/             # AI Agent implementations
│   │   │   ├── master/         # Master coordinator agent
│   │   │   ├── hotel/          # Hotel recommendation agent
│   │   │   ├── food/           # Restaurant/food agent
│   │   │   ├── activity/       # Activity/attraction agent
│   │   │   ├── transport/      # Transportation agent
│   │   │   ├── budget/         # Budget optimization agent
│   │   │   ├── weather/        # Weather information agent
│   │   │   └── culture/        # Local culture agent
│   │   ├── routes/             # API route handlers
│   │   │   ├── auth/           # Authentication routes
│   │   │   ├── trips/          # Trip management routes
│   │   │   ├── agents/         # Agent interaction routes
│   │   │   └── users/          # User management routes
│   │   ├── models/             # Database models
│   │   │   ├── User.js
│   │   │   ├── Trip.js
│   │   │   ├── Activity.js
│   │   │   └── Agent.js
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   │   └── errorHandler.js
│   │   ├── services/           # Business logic services
│   │   │   ├── aiService.js
│   │   │   ├── tripService.js
│   │   │   └── userService.js
│   │   ├── utils/              # Utility functions
│   │   ├── config/             # Configuration files
│   │   │   ├── database.js
│   │   │   └── redis.js
│   │   └── app.js              # Express app setup
│   ├── database/
│   │   ├── migrations/         # Database migrations
│   │   ├── seeds/              # Seed data
│   │   └── schema.sql          # Database schema
│   ├── tests/                  # Test files
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── shared/                      # Shared resources
│   ├── types/                  # Common TypeScript interfaces
│   ├── constants/              # Shared constants
│   └── utils/                  # Shared utilities
│
├── docker/                      # Docker configuration
│   ├── docker-compose.yml      # Development environment
│   ├── docker-compose.prod.yml # Production environment
│   └── nginx/                  # Nginx configuration
│
├── docs/                        # Documentation
│   ├── api/                    # API documentation
│   ├── deployment/             # Deployment guides
│   └── architecture/           # System architecture docs
│
├── scripts/                     # Build and deployment scripts
│   ├── build.sh
│   ├── deploy.sh
│   └── ci/                     # CI/CD scripts
│
├── .github/                     # GitHub Actions workflows
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── package.json                 # Root package.json
├── docker-compose.yml          # Root docker-compose
└── README.md
```

## 🎯 Core Features

### **AI-Powered Planning**
- Intelligent itinerary generation based on preferences
- Multi-agent coordination for comprehensive planning
- Real-time agent communication and updates
- Personalized recommendations and insights

### **Trip Management**
- Interactive trip builder with drag-and-drop
- Real-time collaboration between travelers
- Budget tracking and optimization
- Weather-aware planning

### **User Experience**
- Modern, responsive UI with Tailwind CSS
- Real-time updates via WebSocket
- Mobile-friendly design
- Offline capability for saved trips

### **Advanced Features**
- Multi-language support
- Accessibility features
- Export/import trip data
- Social sharing capabilities

## 🚀 Development Setup

### **Prerequisites**
- Node.js (v18+)
- PostgreSQL (v14+)
- Docker (for containerization)
- Git

### **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

### **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Configure database and API keys
npm run db:migrate
npm run db:seed
npm run dev
```

### **Database Setup**
```bash
# Create PostgreSQL database
createdb ai_travel_planner

# Run migrations
cd backend
npm run db:migrate
```

## 🔧 Environment Configuration

### **Required API Keys**
- OpenAI API (for AI agents)
- Google Maps API (for maps and places)
- OpenWeatherMap API (for weather data)
- External travel APIs (hotels, flights, etc.)

### **Database Configuration**
- PostgreSQL connection string
- Redis (for caching and sessions)

## 🐳 Docker & Deployment

### **Development**
```bash
docker-compose up -d
```

### **Production**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### **CI/CD Pipeline**
- Automated testing on pull requests
- Docker image building
- Cloud deployment (AWS/GCP/Azure)
- Database migrations
- Health checks and monitoring

## 📊 Database Schema

### **Core Tables**
- `users` - User accounts and profiles
- `trips` - Trip information and metadata
- `days` - Daily itineraries
- `activities` - Individual activities and attractions
- `accommodations` - Hotel and lodging information
- `transportation` - Flight and transport details
- `agents` - AI agent configurations
- `agent_responses` - Agent recommendations and data
- `collaborators` - Trip sharing and collaboration
- `budgets` - Budget tracking and breakdowns

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers

## 🧪 Testing Strategy

### **Frontend Testing**
- Unit tests with Jest and React Testing Library
- Component testing
- Integration tests
- E2E tests with Cypress

### **Backend Testing**
- Unit tests for services and utilities
- Integration tests for API endpoints
- Database testing
- Agent testing

## 📈 Performance Optimization

- React Query for efficient data fetching
- Database indexing and query optimization
- Redis caching for frequently accessed data
- Image optimization and lazy loading
- Code splitting and bundle optimization

## 🔄 Development Workflow

### **Phase 1: Foundation (Weeks 1-2)**
- Project setup and configuration
- Basic authentication system
- Database schema and models
- Core UI components

### **Phase 2: Core Features (Weeks 3-4)**
- Trip creation and management
- Basic agent implementation
- User interface development
- API integration

### **Phase 3: AI Integration (Weeks 5-6)**
- Multi-agent system implementation
- Agent coordination and communication
- Advanced planning features
- Real-time collaboration

### **Phase 4: Polish & Deployment (Weeks 7-8)**
- Testing and bug fixes
- Performance optimization
- Docker containerization
- CI/CD pipeline setup
- Cloud deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Traveling! 🌍✈️**