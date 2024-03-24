import { IFormattedElement } from '../../types';

const Block = ({ element }: { element: IFormattedElement }) => {
    return (
        <div style={element.style} className={element.className}>
            {element.content}
        </div>
    );
};

export default Block;
