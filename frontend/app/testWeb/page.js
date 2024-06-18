'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Testweb() {
    const router = useRouter();
    const selectedSymptoms = "안녕";

    useEffect(() => {
        // 상태를 router.push와 함께 전달
        router.push({
            pathname: '/testWeb/testWebPage',
            query: { selectedSymptoms: encodeURIComponent(selectedSymptoms) },
        });
    }, [router, selectedSymptoms]);

    return (
        <>
            <p>Hi</p>
        </>
    );
}
