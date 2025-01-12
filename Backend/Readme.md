# Jihadhari: AI-Powered Malicious Website Detection System

## Overview
Jihadhari is an intelligent website security system that leverages machine learning to detect and alert users about malicious websites in real-time. The system employs advanced machine learning techniques to analyze URL patterns, website content, and network behavior to identify potential threats, implemented as both a web application and browser extension.

## Current Progress & Features
### Completed Features ✅
- Machine Learning Model:
  - 94.48% Accuracy
  - 98.78% AUC Score
  - 91.43% Precision
  - 93.89% Recall
- Browser Extension:
  - Real-time URL analysis
  - Visual threat indicators
  - Local TensorFlow.js integration
- Frontend Web Application:
  - Modern React + Vite setup
  - Responsive login interface
  - Tailwind CSS styling

### In Development 🚧
- User authentication system
- Dashboard for threat monitoring
- Extended browser extension features
- Backend API integration

## Technology Stack
- **Frontend:**
  - React 18.x
  - Vite
  - Tailwind CSS
  - shadcn/ui components
- **Machine Learning:**
  - TensorFlow 2.x
  - scikit-learn
  - pandas
  - numpy
- **Browser Extension:**
  - TensorFlow.js
  - Vanilla JavaScript
- **Development Tools:**
  - Visual Studio Code
  - Git/GitHub
  - Node.js

## Project Structure
```
Jihadhari/
├── Frontend/
│   ├── fresh-web-app/          # React + Vite application
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/ui/
│   │   │   ├── lib/
│   │   │   ├── pages/
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   ├── public/
│   │   ├── package.json
│   │   └── tailwind.config.js
│   └── extension/              # Browser extension
├── ML/                         # Machine Learning components
│   ├── models/
│   ├── training/
│   └── utils/
└── docs/
```

## Installation & Setup

### Frontend Development
1. Clone the repository:
```bash
git clone https://github.com/LewisMuthee/Jihadhari.git
cd Jihadhari/Frontend/fresh-web-app
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

### Prerequisites
- Node.js and npm
- Git
- Modern web browser (for extension testing)

## Development Progress

### Phase 1: ML Model Development ✅
- Successfully implemented data preprocessing
- Feature extraction pipeline
- Model training and optimization
- Achieved high accuracy and precision metrics

### Phase 2: Browser Extension ✅
- Basic extension structure
- URL analysis implementation
- TensorFlow.js integration
- Security alert system

### Phase 3: Frontend Development 🚧
- Basic authentication UI
- Responsive design implementation
- Component structure setup
- Ongoing development of additional features

## Next Steps
- [ ] Complete user authentication system
- [ ] Develop dashboard interface
- [ ] Implement secure API endpoints
- [ ] Enhance browser extension features
- [ ] Add comprehensive error handling
- [ ] Deploy frontend application

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## Authors
- Lewis Munene Muthee (138833)

## Acknowledgments
- Supervisor: Mr. Harrison Talo
- Strathmore University, School of Computing and Engineering Sciences

## Contact
For any inquiries or support, please contact lewis.muthee@strathmore.edu