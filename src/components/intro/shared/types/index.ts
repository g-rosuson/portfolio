export interface IElement {
    content: string;
    animation: {
        mode: string;
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
