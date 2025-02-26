// src/components/BioForm/BioForm.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const BioForm = ({ onBioDataChange }) => {
    const [formData, setFormData] = useState({
        age: '',
        weight: '', // In pounds to match Home.jsx prompt
        heightFeet: '', // Split height into feet
        heightInches: '', // and inches
        sex: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (formData.age < 0 || formData.age > 120) {
            newErrors.age = 'Age must be between 0 and 120';
        }

        if (!formData.weight) {
            newErrors.weight = 'Weight is required';
        } else if (formData.weight < 0 || formData.weight > 1000) {
            newErrors.weight = 'Weight must be between 0 and 1000 lbs';
        }

        if (!formData.heightFeet) {
            newErrors.heightFeet = 'Height (feet) is required';
        } else if (formData.heightFeet < 0 || formData.heightFeet > 9) {
            newErrors.heightFeet = 'Feet must be between 0 and 9';
        }

        if (formData.heightInches && (formData.heightInches < 0 || formData.heightInches >= 12)) {
            newErrors.heightInches = 'Inches must be between 0 and 11';
        }

        if (!formData.sex) {
            newErrors.sex = 'Sex is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const bioData = {
                age: formData.age,
                weight: formData.weight,
                height: `${formData.heightFeet} feet${formData.heightInches ? ` ${formData.heightInches} inches` : ''}`,
                sex: formData.sex
            };
            onBioDataChange(bioData);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const isFormValid = formData.age && formData.weight && formData.heightFeet && formData.sex;

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl">Patient Information</CardTitle>
                <CardDescription>
                    Enter your biographical details for a tailored assessment.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Age */}
                    <div className="space-y-2">
                        <Label htmlFor="age">Age (years)</Label>
                        <Input
                            id="age"
                            type="number"
                            placeholder="e.g., 25"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            className={errors.age ? 'border-destructive' : ''}
                        />
                        {errors.age && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.age}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Weight */}
                    <div className="space-y-2">
                        <Label htmlFor="weight">Weight (lbs)</Label>
                        <Input
                            id="weight"
                            type="number"
                            placeholder="e.g., 150"
                            value={formData.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                            className={errors.weight ? 'border-destructive' : ''}
                        />
                        {errors.weight && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.weight}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Height (Feet and Inches) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="heightFeet">Height (feet)</Label>
                            <Input
                                id="heightFeet"
                                type="number"
                                placeholder="e.g., 5"
                                value={formData.heightFeet}
                                onChange={(e) => handleInputChange('heightFeet', e.target.value)}
                                className={errors.heightFeet ? 'border-destructive' : ''}
                            />
                            {errors.heightFeet && (
                                <Alert variant="destructive" className="mt-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{errors.heightFeet}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heightInches">Height (inches)</Label>
                            <Input
                                id="heightInches"
                                type="number"
                                placeholder="e.g., 11"
                                value={formData.heightInches}
                                onChange={(e) => handleInputChange('heightInches', e.target.value)}
                                className={errors.heightInches ? 'border-destructive' : ''}
                            />
                            {errors.heightInches && (
                                <Alert variant="destructive" className="mt-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{errors.heightInches}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </div>

                    {/* Sex */}
                    <div className="space-y-2">
                        <Label htmlFor="sex">Biological Sex</Label>
                        <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                            <SelectTrigger id="sex" className={errors.sex ? 'border-destructive' : ''}>
                                <SelectValue placeholder="Select sex" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.sex && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.sex}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full"
                    onClick={handleSubmit} // Kept for edge cases, but form submission should suffice
                >
                    Continue
                </Button>
            </CardFooter>
        </Card>
    );
};

export default BioForm;