const snakeCaseToCamelCase = (value: string) => {
    return value.toLowerCase().split('_')
        .map((word, index) => {
            let tmpWord = word;

            // Convert all but first word to camelcase
            if (index > 0) {
                // Convert first letter to uppercase
                const firstLetterToUppercase = word.charAt(0).toUpperCase();

                // Add the first letter to remaining letters of the word
                tmpWord = firstLetterToUppercase + word.slice(1);
            }

            return tmpWord;
        }).join('');
};

const conversion = {
    snakeCaseToCamelCase
};

export default conversion;