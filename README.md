SynapseMD is a web-based AI-powered medical assistant designed to provide personalized health assessments. Users input biographical data (age, weight, height, sex) and symptoms, and the app leverages Google’s Gemini AI to generate structured insights—probable causes, actionable advice, and a professional consultation disclaimer. Built with Vite, React, and shadcn/ui, it features an intuitive interface with interactive tabs and accordions for exploring results.

This project aims to enhance health literacy while emphasizing the importance of consulting healthcare professionals for accurate diagnoses.

Features
Bio Form: Collects user details like age, weight, height, and sex with real-time validation.
Symptom Input: Allows detailed symptom entry (main symptom, duration, severity, etc.).
AI Diagnosis: Uses Gemini AI to analyze inputs and return structured health insights.
Interactive Results: Displays diagnoses in collapsible accordions and overview/details tabs.
Responsive Design: Styled with shadcn/ui and Tailwind CSS for a clean, modern look.
Tech Stack
Frontend: Vite, React
AI: Google Gemini API (gemini-1.5-flash)
Styling: shadcn/ui, Tailwind CSS
Icons: Lucide React
Environment: Node.js, dotenv for API key management
Prerequisites
Node.js: v18+ (tested with v23.8.0)
npm: v9+ (or yarn/pnpm if preferred)

