// src/pages/LandingPage.js
import React from 'react';
import { Button } from '@/components/ui/button';
import {useNavigate} from 'react-router-dom'; // If using Next.js routing, or react-router-dom

function LandingPage() {

    const navigate = useNavigate(); // If using react-router-dom

    const handleGetStarted = () => {
        navigate('/home'); // If using react-router-dom
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Moving Background Graphic (Placeholder) */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 animate-pulse opacity-50"></div>

            <div className="relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-8">
                    Hello, Welcome to SynapseMD, YOUR AI doctor
                </h1>
                <Button size="lg" onClick={handleGetStarted}>
                    Get Started
                </Button>
            </div>
        </div>
    );
}

export default LandingPage;