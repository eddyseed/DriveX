import { useState } from 'react';

export const useErrorModal = () => {
    const [error, setError] = useState<{ head: string; msg: string } | null>(null);

    const showError = (head: string, msg: string) => setError({ head, msg });
    const hideError = () => setError(null);

    return {
        isVisible: !!error,
        errorHead: error?.head ?? '',
        errorMsg: error?.msg ?? '',
        showError,
        hideError,
    };
};
