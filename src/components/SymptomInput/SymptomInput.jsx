// src/components/SymptomInput/SymptomInput.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
            newErrors.mainSymptom = 'Main symptom is required';
        } else if (symptoms.mainSymptom.length > 200) {
            newErrors.mainSymptom = 'Main symptom must be under 200 characters';
        }

        if (!symptoms.duration.trim()) {
            newErrors.duration = 'Duration is required';
        } else if (symptoms.duration.length > 100) {
            newErrors.duration = 'Duration must be under 100 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Format symptoms into an array for Home.jsx
            const symptomList = [];
            symptomList.push(`${symptoms.mainSymptom} for ${symptoms.duration}`);
            if (symptoms.additionalSymptoms.trim()) {
                symptomList.push(...symptoms.additionalSymptoms.split(',').map(s => s.trim()));
            }
            if (symptoms.severity) {
                symptomList.push(`severity: ${symptoms.severity}`);
            }
            if (symptoms.triggers.trim()) {
                symptomList.push(`triggers: ${symptoms.triggers}`);
            }
            onSymptomsChange(symptomList);
        }
    };

    const handleInputChange = (field, value) => {
        setSymptoms((prev) => ({
            ...prev,
            [field]: value
        }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const isFormValid = symptoms.mainSymptom.trim() && symptoms.duration.trim();

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl">Symptom Information</CardTitle>
                <CardDescription>
                    Describe your symptoms in detail for a tailored assessment.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Main Symptom */}
                    <div className="space-y-2">
                        <Label htmlFor="mainSymptom">Main Symptom</Label>
                        <Textarea
                            id="mainSymptom"
                            placeholder="e.g., headache"
                            value={symptoms.mainSymptom}
                            onChange={(e) => handleInputChange('mainSymptom', e.target.value)}
                            className={errors.mainSymptom ? 'border-destructive' : ''}
                        />
                        {errors.mainSymptom && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.mainSymptom}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Textarea
                            id="duration"
                            placeholder="e.g., 2 days"
                            value={symptoms.duration}
                            onChange={(e) => handleInputChange('duration', e.target.value)}
                            className={errors.duration ? 'border-destructive' : ''}
                        />
                        {errors.duration && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.duration}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Additional Symptoms */}
                    <div className="space-y-2">
                        <Label htmlFor="additionalSymptoms">Additional Symptoms</Label>
                        <Textarea
                            id="additionalSymptoms"
                            placeholder="e.g., fever, nausea (separate with commas)"
                            value={symptoms.additionalSymptoms}
                            onChange={(e) => handleInputChange('additionalSymptoms', e.target.value)}
                        />
                    </div>

                    {/* Severity */}
                    <div className="space-y-2">
                        <Label htmlFor="severity">Severity</Label>
                        <Select
                            value={symptoms.severity}
                            onValueChange={(value) => handleInputChange('severity', value)}
                        >
                            <SelectTrigger id="severity">
                                <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mild">Mild</SelectItem>
                                <SelectItem value="moderate">Moderate</SelectItem>
                                <SelectItem value="severe">Severe</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Triggers */}
                    <div className="space-y-2">
                        <Label htmlFor="triggers">Triggers or Patterns</Label>
                        <Textarea
                            id="triggers"
                            placeholder="e.g., stress, lack of sleep"
                            value={symptoms.triggers}
                            onChange={(e) => handleInputChange('triggers', e.target.value)}
                        />
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full"
                    onClick={handleSubmit} // Kept as fallback, but form submission should suffice
                >
                    Continue
                </Button>
            </CardFooter>
        </Card>
    );
};

export default SymptomInput;