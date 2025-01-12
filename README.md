# Jihadhari - Malicious URL Detection System

A web-based application that uses machine learning to detect and analyze potentially malicious URLs in real-time.

## Project Structure
```
Jihadhari/
├── Backend/
│   ├── controllers/         # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/            # Utility functions
│   └── server.js         # Entry point
└── Frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── pages/       # Page components
    │   └── services/    # API services
    └── public/         # Static files
```

## Features

- Real-time URL scanning and analysis
- Machine learning-based threat detection
- User authentication and history tracking
- Detailed risk analysis and reporting
- Responsive web interface

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- TensorFlow.js for URL analysis

### Frontend
- React
- Tailwind CSS
- React Router
- Axios for API calls

## Installation

1. Clone the repository:
```bash
git clone https://github.com/LewisMunene/Jihadhari.git
cd Jihadhari
```

2. Install Backend dependencies:
```bash
cd Backend
npm install
```

3. Install Frontend dependencies:
```bash
cd Frontend
npm install
```

4. Set up environment variables:
Create a `.env` file in the Backend directory with:
```env
PORT=8000
MONGODB_URI=mongodb://127.0.0.1:27017/jihadhari
JWT_SECRET=your_jwt_secret_here
```

## Running the Application

1. Start the Backend server:
```bash
cd Backend
npm start
```

2. Start the Frontend development server:
```bash
cd Frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user

### URL Scanning
- POST `/api/scan/scan` - Scan a URL
- GET `/api/scan/history` - Get scan history

## Security Features

- JWT authentication
- Password hashing
- Input validation
- CORS protection
- Rate limiting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.