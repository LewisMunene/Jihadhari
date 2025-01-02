# Jihadhari
Jihadhari: AI-Powered Malicious Website Detection System
# Jihadhari: AI-Powered Malicious Website Detection System

## Overview
Jihadhari is an intelligent Intrusion Detection System (IDS) that leverages machine learning algorithms to detect and alert users about malicious websites in real-time. The system employs advanced deep learning techniques, specifically Convolutional Neural Networks (CNN), to analyze URL patterns, website content, and network behavior to identify potential threats.

## Features
- Real-time malicious website detection
- AI-powered threat analysis using CNN
- Continuous learning and adaptation to new threats
- Low false-positive rate through advanced machine learning
- User-friendly dashboard for threat monitoring
- Comprehensive API for system integration

## Technology Stack
- **Programming Languages:**
  - Python 3.9 (Backend & ML)
  - JavaScript (Frontend)
- **Frameworks & Libraries:**
  - Django 4.0 (Web Framework)
  - TensorFlow 2.7 (ML Framework)
  - Keras (Deep Learning)
  - Scikit-learn (Machine Learning)
- **Development Tools:**
  - Visual Studio Code
  - Git/GitHub
  - Docker (Containerization)

## Prerequisites
- Python 3.9 or higher
- Node.js and npm
- Git
- Docker (optional)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/jihadhari.git
cd jihadhari
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Install frontend dependencies:
```bash
cd frontend
npm install
```

5. Set up environment variables:
```bash
cp .env.example .env
# Edit .env file with your configuration
```

## Project Structure
```
jihadhari/
├── README.md
├── requirements.txt
├── .gitignore
├── .env.example
├── backend/
│   ├── manage.py
│   ├── jihadhari/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── core/
│   │   ├── models.py
│   │   ├── views.py
│   │   └── tests.py
│   └── ml/
│       ├── models/
│       ├── training/
│       └── utils/
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
└── docs/
    ├── api/
    └── deployment/
```

## Development Setup

1. Start the Django development server:
```bash
cd backend
python manage.py migrate
python manage.py runserver
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

## Testing
```bash
# Run backend tests
python manage.py test

# Run frontend tests
cd frontend
npm test
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors
- Lewis Munene Muthee (138833)

## Acknowledgments
- Supervisor: Mr. Harrison Talo
- Strathmore University, School of Computing and Engineering Sciences

## Contact
For any inquiries or support, please contact lewis.muthee@strathmore.edu
