// src/pages/Home.jsx
import React, { useState } from 'react';
import BioForm from '../components/BioForm/BioForm';
import SymptomInput from '../components/SymptomInput/SymptomInput';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { getMedicalAdvice } from '@/services/api';
import { Button } from '@/components/ui/button';
import DiagnosisResults from '../components/DiagnosisResult/DiagnosisResult'; // Uncommented
// import ErrorDisplay from '../components/ErrorDisplay/ErrorDisplay'; // Uncommented

function Home() {
    const [bioData, setBioData] = useState(null); // { age, weight, sex }
    const [symptoms, setSymptoms] = useState([]); // Array of symptom strings
    const [diagnosis, setDiagnosis] = useState(null); // API response string
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (!bioData || symptoms.length === 0) {
            setError('Please provide bio data and at least one symptom.');
            return;
        }

        setLoading(true);
        setError(null);

        // Construct prompt for Gemini API
        const bioString = `The user is ${bioData.age} years old, weighs ${bioData.weight} pounds, and is ${bioData.sex}. Their height is ${bioData.height}.`;
        const symptomString = `They have the following symptoms: ${symptoms.join(', ')}.`;
        const prompt = `${bioString} ${symptomString} What should they do?`;

        try {
            const result = await getMedicalAdvice(prompt);
            setDiagnosis(result);
        } catch (err) {
            setError(err.message || 'Failed to fetch diagnosis. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-2xl space-y-8">
                <h1 className="text-3xl font-bold text-center text-gray-800">SynapseMD</h1>

                {/* BioForm */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <BioForm onBioDataChange={setBioData} />
                </section>

                {/* SymptomInput - Show only if bioData exists */}
                {bioData && (
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <SymptomInput onSymptomsChange={setSymptoms} />
                    </section>
                )}

                {/* Submit Button - Show only if symptoms exist */}
                {symptoms.length > 0 && (
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full max-w-xs mx-auto block"
                    >
                        {loading ? 'Processing...' : 'Get Diagnosis'}
                    </Button>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center">
                        <LoadingSpinner message="Getting Diagnosis..." />
                    </div>
                )}

                {/*/!* Error State *!/*/}
                {/*{error && !loading && (*/}
                {/*    <ErrorDisplay message={error} onDismiss={() => setError(null)} />*/}
                {/*)}*/}

                {/* Diagnosis Results */}
                {diagnosis && !loading && !error && (
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <DiagnosisResults results={diagnosis} />
                    </section>
                )}
            </div>
        </div>
    );
}

export default Home;