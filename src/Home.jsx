import React, { useState } from 'react';
import BioForm from './components/BioForm/BioForm';
import SymptomInput from './components/SymptomInput/SymptomInput';
// import DiagnosisResults from './components/DiagnosisResult/DiagnosisResult';
// import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
// import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';
//import { getDiagnosis } from '../services/api'; // Import your API service
import {Container} from "react-bootstrap";

function Home() {
    const [bioData, setBioData] = useState(null);
    const [symptoms, setSymptoms] = useState([]);
    const [diagnosis, setDiagnosis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        // setLoading(true);
        // setError(null);
        // try {
        //     const result = await getDiagnosis(bioData, symptoms);
        //     setDiagnosis(result);
        // } catch (err) {
        //     setError(err.message || 'An error occurred.');
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div>
            <BioForm onBioDataChange={setBioData} />
            <SymptomInput onSymptomsChange={setSymptoms} />
            {/*<button onClick={handleSubmit} disabled={loading || !bioData || symptoms.length === 0}>*/}
            {/*    Get Diagnosis*/}
            {/*</button>*/}
            {/*{loading && <LoadingSpinner />}*/}
            {/*{error && <ErrorDisplay message={error} />}*/}
            {/*{diagnosis && <DiagnosisResults results={diagnosis} />}*/}
        </div>
    );
}

export default Home;