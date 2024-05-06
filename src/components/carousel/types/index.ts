export interface IConfiguration {
    mode: string;
    loop: boolean;
    startAt: number;
    blocks: IBLock[];
}

export interface IBLock {
    content?: string;
    elements?: IBlockElement[];
    animation: {
        mode: 'incremental';
        type: 'fade-in-lower';
        easing: 'ease-in' | 'ease-in-out' | 'ease-out' | 'linear';
        duration: {
            mode: 'per-character' | 'per-element';
            amount: number;
        };
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

export interface IBlockElement {
    content: string;
    font?: Partial<{
        name: string;
        size: string;
        weight: string;
        style: string;
        color: string;
    }>;
    animation?: Partial<{
        duration: {
            mode: 'per-character' | 'per-element';
            amount: number;
        };
        timeout: number;
    }>;
}

export interface IFormattedBlockElement {
    content: string;
    style?: Partial<{
        fontWeight?: string;
        fontSize?: string;
        color?: string;
        animationDuration?: string;
    }>;
    animation?: Partial<{
        duration: number;
        timeout: number;
    }>;
}

export interface IFormattedBlock {
    content?: string;
    elements?: IFormattedBlockElement[];
    className: string;
    style: {
        fontFamily: string;
        fontWeight: string;
        fontSize: string;
        color: string;
        animationDuration: string;
    };
    animation: {
        duration: number;
        startAt: number;
        timeout: number;
    };
}
