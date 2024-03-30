import { useEffect, useRef } from 'react';

const usePrevRef = <T>(value?: T) => {
    const prevRef = useRef<T>();

    useEffect(() => {
        prevRef.current = value;
    }, [value]);

    return prevRef.current;
};

export default usePrevRef;
