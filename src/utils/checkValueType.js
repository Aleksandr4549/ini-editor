const checkValueType = (text) => {
    if (text.startsWith('[') && text.endsWith(']')) {
        return 'title';
    }

    if (!text.includes('=')) {
        return 'unkown';
    }

    if (isNaN(text.split('=')[1]) && text.split('=')[1].trim() !== '') {
        return 'string';
    }

    if (!isNaN(text.split('=')[1]) && text.split('=')[1].trim() !== '') {
        return 'number';
    }

    return 'unkown';
}

export default checkValueType;