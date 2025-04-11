export const createHeaders = (customHeaders = {}) => {
    return {
        'ngrok-skip-browser-warning': 'true',
        ...customHeaders,
    };
};