import React from 'react';
import { Loader2 } from 'lucide-react'; // shadcn-compatible spinner icon

const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">{message}</p>
        </div>
    );
};

export default LoadingSpinner;