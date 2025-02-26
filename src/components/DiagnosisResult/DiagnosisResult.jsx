import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, AlertCircle } from 'lucide-react';

const DiagnosisResults = ({ results }) => {
    const [parsedResults, setParsedResults] = useState({
        probableCauses: [],
        advice: [],
        disclaimer: ''
    });

    useEffect(() => {
        const parseResults = (text) => {
            const sections = text.split('###').map(section => section.trim()).filter(Boolean);
            let probableCauses = [];
            let advice = [];
            let disclaimer = '';

            sections.forEach(section => {
                const lines = section.split('\n').filter(line => line.trim());
                const header = lines[0]?.toLowerCase();

                if (header?.includes('probable causes')) {
                    probableCauses = lines.slice(1).map(line => line.replace(/^- /, '').trim());
                } else if (header?.includes('advice')) {
                    advice = lines.slice(1).map(line => line.replace(/^\d+\.\s*/, '').trim());
                } else if (header?.includes('disclaimer')) {
                    disclaimer = lines.slice(1).join(' ').trim();
                }
            });

            return {
                probableCauses: probableCauses.length ? probableCauses : ['No specific causes identified based on the provided information.'],
                advice: advice.length ? advice : ['Monitor your symptoms and rest.'],
                disclaimer: disclaimer || 'Always consult a healthcare professional for an accurate diagnosis and personalized advice.'
            };
        };

        if (results) {
            setParsedResults(parseResults(results));
        }
    }, [results]);

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                    <Info className="h-6 w-6 text-primary" />
                    Your Health Assessment
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Tabs for Overview and Details */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab - Quick Summary */}
                    <TabsContent value="overview">
                        <div className="space-y-4">
                            <p className="text-muted-foreground">
                                Here’s a quick look at what might be happening and your next steps based on your input.
                            </p>
                            <div className="bg-primary/10 p-4 rounded-lg">
                                <h3 className="font-semibold text-primary">Possible Issue</h3>
                                <p>{parsedResults.probableCauses[0]}</p>
                            </div>
                            <div className="bg-primary/10 p-4 rounded-lg">
                                <h3 className="font-semibold text-primary">First Step</h3>
                                <p>{parsedResults.advice[0]}</p>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Details Tab - Interactive Breakdown */}
                    <TabsContent value="details">
                        <Accordion type="single" collapsible className="w-full">
                            {/* Probable Causes */}
                            <AccordionItem value="causes">
                                <AccordionTrigger className="text-lg font-medium hover:text-primary"
                                style={{color:'antiquewhite'}}>
                                    Probable Causes ({parsedResults.probableCauses.length})
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                        {parsedResults.probableCauses.map((cause, index) => (
                                            <li key={index}>{cause}</li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Advice */}
                            <AccordionItem value="advice">
                                <AccordionTrigger className="text-lg font-medium hover:text-primary"
                                                  style={{color:'antiquewhite'}}>
                                    Recommended Actions ({parsedResults.advice.length})
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                        {parsedResults.advice.map((tip, index) => (
                                            <li key={index}>{tip}</li>
                                        ))}
                                    </ol>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TabsContent>
                </Tabs>

                {/* Disclaimer */}
                {parsedResults.disclaimer && (
                    <Alert variant="warning" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{parsedResults.disclaimer}</AlertDescription>
                    </Alert>
                )}
            </CardContent>

            <CardFooter>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.location.reload()} // Reset for demo; replace with onReset prop if needed
                >
                    Start Over
                </Button>
            </CardFooter>
        </Card>
    );
};

export default DiagnosisResults;