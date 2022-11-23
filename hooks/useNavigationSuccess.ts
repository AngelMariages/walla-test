import { useEffect } from 'react';

declare global {
    interface Window {
        navigation: {
            addEventListener: (event: string, callback: () => void) => void;
            removeEventListener: (event: string, callback: () => void) => void;
        };
    }
}

const useNavigationSuccess = (routeChangeEnd: () => void) => {
    useEffect(() => {
        const { navigation } = window;

        if (navigation) {
            navigation.addEventListener('navigatesuccess', routeChangeEnd);

            return () => {
                navigation.removeEventListener(
                    'navigatesuccess',
                    routeChangeEnd
                );
            };
        }
    }, [routeChangeEnd]);
};

export default useNavigationSuccess;
