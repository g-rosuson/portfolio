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
        size: number;
        weight: number;
        style: string;
        color: string;
    };
}

export interface IConstructedElement {
    content: string;
    style: {
        fontWeight: number;
        fontSize: string;
        color: string;
        animationTimingFunction: string;
        animationDuration: string;
    };
    meta: {
        intervalDuration: number;
        className: string;
        startAt: number;
        timeout: number;
    };
}
