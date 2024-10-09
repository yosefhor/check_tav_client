export const addDash = (text) => {
    const formats = {
        5: [2], 6: [3], 7: [2, 6], 8: [3, 6]
    };
    const splitIndexes = formats[text.length];
    return splitIndexes ? splitIndexes.reduce((str, i) => str.slice(0, i) + '-' + str.slice(i), text) : text;
};
