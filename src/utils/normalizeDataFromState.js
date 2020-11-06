import checkIsEmptyObject from './checkIsEmptyObj';

const normalizeData = (arr) => {
    //функция принимает массив lines из текстового редактора и возвращает массив секций для state,
    const sections = [];
    let section = {
        sectionTitle: {},
        sectionKeys: []
    };

    arr.forEach((elem, i) => {
        if (elem.type === 'title') {
            if (!checkIsEmptyObject(section.sectionTitle)) {
                sections.push(section);
                section = {
                    sectionTitle: {},
                    sectionKeys: []
                };
            }
            section.sectionTitle = elem;
        } else {
            section.sectionKeys.push({type: 'key', value: {keyType: elem.type, keyValue: elem.value}});
        }

        if (i === arr.length - 1) {
            sections.push(section);
        }
    });

    return sections;
};

export default normalizeData;