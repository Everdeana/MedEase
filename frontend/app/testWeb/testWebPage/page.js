'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TestWebPage() {
    const searchParams = useSearchParams();
    const [selectedSymptoms, setSelectedSymptoms] = useState("");

    useEffect(() => {
        // URL 매개변수에서 데이터 가져오기
        const symptoms = searchParams.get('selectedSymptoms');
        if (symptoms) {
            setSelectedSymptoms(decodeURIComponent(symptoms));
        }
    }, [searchParams]);

    return (
        <div>
            <p>Selected Symptoms: {selectedSymptoms}</p>
        </div>
    );
}
