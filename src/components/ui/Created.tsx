import { useState, useEffect } from 'react';

export default function Created() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            role="alert"
            className={`alert alert-success absolute top-2 right-2 max-w-sm transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'
                }`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>Creado con éxito!</span>
        </div>
    );
}
