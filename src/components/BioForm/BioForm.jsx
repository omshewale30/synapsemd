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
        weight: '',
        height: '',
        sex: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (formData.age) {
            if (formData.age < 0 || formData.age > 120) {
                newErrors.age = 'Please enter a valid age between 0 and 120';
            }
        }

        if (formData.weight) {
            if (formData.weight < 0 || formData.weight > 500) {
                newErrors.weight = 'Please enter a valid weight between 0 and 500 kg';
            }
        }

        if (formData.height) {
            if (formData.height < 0 || formData.height > 300) {
                newErrors.height = 'Please enter a valid height between 0 and 300 cm';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onBioDataChange(formData);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>
                    Please enter your biographical information for accurate diagnosis
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            type="number"
                            placeholder="Enter your age"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            className={errors.age ? 'border-red-500' : ''}
                        />
                        {errors.age && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.age}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input
                                id="weight"
                                type="number"
                                placeholder="Enter weight"
                                value={formData.weight}
                                onChange={(e) => handleInputChange('weight', e.target.value)}
                                className={errors.weight ? 'border-red-500' : ''}
                            />
                            {errors.weight && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{errors.weight}</AlertDescription>
                                </Alert>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="height">Height (cm)</Label>
                            <Input
                                id="height"
                                type="number"
                                placeholder="Enter height"
                                value={formData.height}
                                onChange={(e) => handleInputChange('height', e.target.value)}
                                className={errors.height ? 'border-red-500' : ''}
                            />
                            {errors.height && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{errors.height}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sex">Biological Sex</Label>
                        <Select
                            value={formData.sex}
                            onValueChange={(value) => handleInputChange('sex', value)}
                        >
                            <SelectTrigger id="sex">
                                <SelectValue placeholder="Select biological sex" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full"
                >
                    Continue
                </Button>
            </CardFooter>
        </Card>
    );
};

export default BioForm;