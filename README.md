# Edugenie
EduGenie Google Gemini Powered Learning Assistant

EduGenie is an AI-powered learning assistant built using FastAPI and Google Gemini API.

Features
🤖 AI Question Answering
📚 Concept Explanation
📝 Quiz Generation
📄 Summarization
🛤 Learning Path Suggestions
🌙 Dark Mode
📋 Copy Answer
⬇ Download Notes
🗑 Clear Chat
Technologies Used
Python
FastAPI
Google Gemini API
HTML
CSS
JavaScript
Installation
pip install -r requirements.txt
uvicorn app.main:app --reload
Open:

http://127.0.0.1:8000
Author
Team Leader : Ogireddy Sravani Team member : Chintala Vanitha Team member : Veera VenkkateshhKottum Team member : Sailakshmi Pattisabha Team member : Prem Sai Bora

ER Diagram
Overview
The Entity Relationship Diagram (ERD) represents the logical database design of the EduGenie Learning Assistant. It illustrates the entities, their attributes, and the relationships required to support AI-powered educational services such as Question Answering, Concept Explanation, Quiz Generation, Text Summarization, and Personalized Learning Recommendations.

Entities
The ER Diagram consists of six core entities:

USER
USER_QUERY
AI_RESPONSE
QUIZ
SUMMARY
LEARNING_PATH
Relationships
One USER can submit multiple USER_QUERY records.
Each USER_QUERY generates one AI_RESPONSE.
One USER_QUERY can generate multiple QUIZ records.
One USER_QUERY can generate multiple SUMMARY records.
One USER_QUERY can generate multiple LEARNING_PATH records.
Database Design
The database follows proper normalization principles by separating users, educational requests, AI-generated responses, quizzes, summaries, and learning recommendations into individual entities. Primary and Foreign Keys maintain data integrity and support scalability.

Future Scope
The ER design supports future enhancements including:

User Authentication
Student Progress Tracking
Persistent Chat History
Cloud Database Integration
Multilingual Learning
AI Analytics Dashboard
Mobile Application Support
Epic 1 - Model Selection and Architecture
Objective
Set up the EduGenie AI learning assistant using FastAPI and Google Gemini.

Features Completed
FastAPI project setup
Google Gemini API integration
Question & Answer module
Learning Path module
Quiz module
Summary module
HTML Templates
Static files support
Environment variable configuration using .env
Technologies Used
Python
FastAPI
Google Gemini API
Jinja2
HTML/CSS
Pre-Requisites
Before running EduGenie, ensure the following software is installed:

Python 3.10+
FastAPI
Uvicorn
Google Gemini API Key
Jinja2
HTML, CSS, JavaScript
Git
Visual Studio Code
Installation
pip install -r requirements.txt
uvicorn app.main:app --reload

# Epic 2 - Module Implementation

## Objective

Implement the core AI learning modules of EduGenie to provide different learning services using Google Gemini AI.

## Modules Implemented

- Question Answering Module
- Concept Explanation Module
- Quiz Generation Module
- Summarization Module
- Learning Path Module

## Features Completed

- Created separate Python modules for each learning task.
- Integrated all modules with Google Gemini AI.
- Improved code organization using modular architecture.
- Connected frontend with backend modules.
- Implemented AI response generation for each selected task.
- Added exception handling for API errors.

## Technologies Used

- Python
- Google Gemini API
- FastAPI

# Backend API with FastAPI

## Objective

Develop a FastAPI backend to process user requests, communicate with Google Gemini AI, and manage chat interactions.

## Backend Features Completed

- FastAPI application setup
- Google Gemini API integration
- POST API endpoint for processing user questions
- GET API endpoint for homepage
- Dynamic Jinja2 template rendering
- Static files configuration
- Chat history management
- Clear Chat endpoint
- Environment variable support using `.env`
- Exception handling for API errors

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Load EduGenie homepage |
| POST | `/ask` | Process user questions |
| GET | `/clear` | Clear chat history |

## Technologies Used

- Python
- FastAPI
- Google Gemini API
- Jinja2 Templates
- HTML
- CSS
- JavaScript
- python-dotenv

# Epic 3 - Build Web Interface

## Objective

Develop a responsive and user-friendly web interface for EduGenie using HTML, CSS, JavaScript, and Jinja2 templates.

## Features Completed

- Professional AI-inspired user interface
- Responsive web design for desktop and mobile
- Modern navigation header
- Interactive hero section
- AI task selection interface
- Question Answering interface
- Concept Explanation interface
- Quiz Generation interface
- Text Summarization interface
- Learning Path interface
- Dynamic chat interface
- AI response display
- Chat history
- Dark Mode
- Copy Answer
- Download Notes
- Clear Chat
- Loading animation
- Smooth UI animations and transitions
- Responsive cards and components

## Technologies Used

- HTML5
- CSS3
- JavaScript
- FastAPI
- Jinja2 Templates

# Epic 3 - Live Integration

## Objective

Integrate the frontend interface with the FastAPI backend to enable real-time communication with Google Gemini AI.

## Features Completed

- Connected HTML forms with FastAPI
- POST request handling
- User input processing
- Google Gemini AI integration
- Dynamic response rendering
- Chat history management
- Error handling
- Jinja2 template rendering
- Static file support

## AI Model

EduGenie uses **Google Gemini 2.5 Flash** as its primary Large Language Model (LLM) to power intelligent educational interactions.

### Model Capabilities

- Intelligent Question Answering
- Concept Explanation
- Quiz Generation
- Educational Text Summarization
- Personalized Learning Recommendations
- Fast Response Generation
- Natural Language Understanding

### Model Used

- **Google Gemini 2.5 Flash**

# Epic 4 - Local Deployment and Functional Testing

## Objective

Deploy the EduGenie Learning Assistant in a local development environment and perform functional testing to verify that all AI-powered educational modules work correctly through the FastAPI backend.

---

## Run Locally

### Objective

Execute the EduGenie application using FastAPI and Uvicorn to enable local development, testing, and real-time interaction.

### Features Completed

- Configured FastAPI application for local execution
- Started the application using Uvicorn
- Enabled automatic server reload using the `--reload` option
- Successfully launched the local development server
- Verified frontend and backend connectivity
- Tested the application through a web browser
- Confirmed successful communication with the Google Gemini API

### Command Used

```bash
uvicorn app.main:app --reload
Local Server URL
http://127.0.0.1:8000
Functional Testing
Objective
Verify that all educational modules perform correctly and produce accurate AI-generated responses under normal user interactions.

Functional Tests Performed
Question Answering
Concept Explanation
Quiz Generation
Text Summarization
Personalized Learning Path
Dark Mode
Clear Chat
Copy Answer
Download Notes
Chat History
Test Results
Module	Status
Question Answering	✅ Passed
Concept Explanation	✅ Passed
Quiz Generation	✅ Passed
Text Summarization	✅ Passed
Learning Path	✅ Passed
Dark Mode	✅ Passed
Copy Answer	✅ Passed
Download Notes	✅ Passed
Clear Chat	✅ Passed
Chat History	✅ Passed
Outcome
The EduGenie Learning Assistant was successfully executed in the local development environment. All frontend components communicated seamlessly with the FastAPI backend, and Google Gemini AI generated responses for each educational module. Functional testing confirmed that every feature operated correctly, providing a smooth and interactive learning experience.

Conclusion
EduGenie is a modern AI-powered learning assistant developed using FastAPI and Google Gemini AI to provide an interactive educational experience.

The application offers intelligent features such as Question Answering, Concept Explanation, Quiz Generation, Text Summarization, and Personalized Learning Path recommendations through a professional, responsive web interface.

The frontend was designed with HTML, CSS, JavaScript, and Jinja2 Templates, while FastAPI handles backend processing and Google Gemini AI generates intelligent educational responses. The application was successfully integrated, locally deployed, and functionally tested.

With its modular architecture, responsive design, and AI-powered capabilities, EduGenie provides a scalable foundation for future enhancements such as user authentication, persistent chat history, PDF learning support, and multilingual learning assistance.
