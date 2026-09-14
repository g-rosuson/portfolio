import React from 'react';

import Logo from 'src/components/ui/logo/Logo';

import styling from './Spinner.module.scss';

const Spinner = () => {
    return (
        <div className={styling.container}>
            <div className={styling.spinner}>
                <Logo/>
            </div>

            <div className={styling.message}>Loading resources</div>
        </div>
    );
};

export default Spinner;