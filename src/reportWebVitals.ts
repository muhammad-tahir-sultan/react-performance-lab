
import { onLCP, onCLS, onINP } from 'web-vitals';

export const initWebVitals = (onPerfEntry?: (metric: any) => void) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        onLCP(onPerfEntry);
        onCLS(onPerfEntry);
        onINP(onPerfEntry);
    }
};
