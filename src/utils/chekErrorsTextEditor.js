const checkErrors = (arr) => {
    const errors = [];
    if (arr[0].type !== 'title') {
        errors.push({index: 0, error: 'У секции должен быть заголовок'});
    }

    arr.forEach((elem, i) => {
        if (elem.type === 'unkown') {
            errors.push({index: i, error: 'Неизвестный тип данных'})
        }
    });

    return errors.length > 0 ? errors : null;
};

export default checkErrors;