export interface IConfiguration {
    mode: string;
    loop: boolean;
    startAt: number;
    elements: IElement[];
}

export interface IElement {
    content: string;
    animation: {
        mode: 'block' | 'sequential' | 'incremental';
        type: 'fade-in-lower';
        easing: 'ease-in' | 'ease-in-out' | 'ease-out' | 'linear';
        duration: number;
        startAt?: number;
        timeout?: number;
    };
    font: {
        name: string;
        size: string;
        weight: string;
        style: string;
        color: string;
    };
}

export interface IFormattedElement {
    content: string;
    className: string;
    style: {
        fontWeight: string;
        fontSize: string;
        color: string;
        animationTimingFunction: string;
        animationDuration: string;
    };
    animation: {
        intervalDuration: number;
        startAt: number;
        timeout: number;
    };
}
