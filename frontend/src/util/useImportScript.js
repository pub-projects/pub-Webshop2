import { useEffect } from 'react';

const useImportScript = scriptUrl => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [scriptUrl]);
}

export { useImportScript };