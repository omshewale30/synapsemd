import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const SymptomInput = ({ onSymptomsChange }) => {
    const [symptoms, setSymptoms] = useState({
        mainSymptom: '',
        duration: '',
        additionalSymptoms: '',
        severity: '',
        triggers: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!symptoms.mainSymptom.trim()) {
            newErrors.mainSymptom = 'Please describe your main symptom';
        }
        if (!symptoms.duration.trim()) {
            newErrors.duration = "Please indicate how long you've had these symptoms";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSymptomsChange(symptoms);
        }
    };

    const handleInputChange = (field, value) => {
        setSymptoms(prev => ({
            ...prev,
            [field]: value
        }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Symptom Information</CardTitle>
                <CardDescription>
                    Please describe your symptoms in detail for accurate diagnosis
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="mainSymptom">Main Symptom</Label>
                        <Textarea
                            id="mainSymptom"
                            placeholder="What is your main symptom or concern?"
                            value={symptoms.mainSymptom}
                            onChange={(e) => handleInputChange('mainSymptom', e.target.value)}
                            className={errors.mainSymptom ? 'border-red-500' : ''}
                        />
                        {errors.mainSymptom && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.mainSymptom}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Textarea
                            id="duration"
                            placeholder="How long have you had these symptoms?"
                            value={symptoms.duration}
                            onChange={(e) => handleInputChange('duration', e.target.value)}
                            className={errors.duration ? 'border-red-500' : ''}
                        />
                        {errors.duration && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.duration}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="additionalSymptoms">Additional Symptoms</Label>
                        <Textarea
                            id="additionalSymptoms"
                            placeholder="Are you experiencing any other symptoms?"
                            value={symptoms.additionalSymptoms}
                            onChange={(e) => handleInputChange('additionalSymptoms', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="severity">Severity</Label>
                        <Textarea
                            id="severity"
                            placeholder="How severe are your symptoms? (e.g., mild, moderate, severe)"
                            value={symptoms.severity}
                            onChange={(e) => handleInputChange('severity', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="triggers">Triggers or Patterns</Label>
                        <Textarea
                            id="triggers"
                            placeholder="Have you noticed anything that triggers or worsens your symptoms?"
                            value={symptoms.triggers}
                            onChange={(e) => handleInputChange('triggers', e.target.value)}
                        />
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full"
                >
                    Submit Symptoms
                </Button>
            </CardFooter>
        </Card>
    );
};

export default SymptomInput;