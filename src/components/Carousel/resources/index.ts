import localFont from 'next/font/local';

const nabla = localFont({
    src: [
        {
            path: './fonts/nabla/Nabla-Regular.ttf',
        },
    ],
});

const fonts = [
    { name: 'Nabla', file: nabla },
];


const resources = {
    fonts
};

export default resources;
