'use client';

import React from 'react';

import ErrorComponent from 'src/components/shared/error/Error';

export default function Error({ reset }: { reset: () => void }) {
    return <ErrorComponent reset={reset}/>;
}
