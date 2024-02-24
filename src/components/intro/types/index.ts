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
        type: string;
        easing: 'ease-in' | 'ease-in-out' | 'ease-out' | 'linear';
        duration: number;
        startAt?: number;
    };
    font: {
        name: string;
        size: number;
        weight: number;
        style: string;
        color: string;
    };
}
