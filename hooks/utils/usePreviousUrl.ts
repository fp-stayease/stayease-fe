"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function usePreviousURL() {
    const pathname = usePathname();
    const previousPathnameRef = useRef<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (previousPathnameRef.current !== null) {
                sessionStorage.setItem('previousURL', previousPathnameRef.current);
            }
            previousPathnameRef.current = pathname;
        }
    }, [pathname]);

    const getPreviousURL = () => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('previousURL') || null;
        }
        return null;
    };

    return {getPreviousURL};
}