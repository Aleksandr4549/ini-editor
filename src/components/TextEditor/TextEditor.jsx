import { useState, useEffect } from 'react';

import checkValueType from '../../utils/checkValueType';
import normalizeData from '../../utils/normalizeDataFromState';
import checkErrors from '../../utils/chekErrorsTextEditor';
import Line from './Line/Line';
import DefaultBtn from '../Buttons/DefaultBtn/DefaultBtn';
import ErrorsBar from '../ErrorsBar/ErrorsBar';
import styles from './textEditor.module.scss';

const TextEditor = ({sections,  fileId, replaceSections}) => {
    const [lines, setLines] = useState([]);
    const [cursorPosition, setCursorPosition] = useState(0);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const entitySections = []
        sections.forEach(section => {
            const title = {type: 'title', value: section.sectionTitle.value};
            const keys = section.sectionKeys.map(key => ({type: key.value.keyType, value: key.value.keyValue}));
            entitySections.push(title);
            entitySections.push(...keys);
        });
        setLines(entitySections);

        if (sections.length === 0) {
            setLines([{type: 'unkown', value: ''}])
        }
    }, [fileId]);

    const onChangeHandler = (numberLine, value) => {
        const valueType = checkValueType(value);
        setLines(lines.map((line, i) => i === numberLine ? {type: valueType, value} : line));
        setErrors([]);
    };

    const addNewLine = (numberLine, value = '') => {
        //функция добавляет в текстовое поле новую строку при нажатии на клавишу Enter.
        //Если Enter был нажат не в конце строки, то значение справа от курсора удаляется из
        //текущей строки и добавляется в новую
        const linesCopy = [...lines];
        const valueType = checkValueType(value);
        linesCopy.splice(numberLine + 1, 0, {type: valueType, value});
        linesCopy[numberLine] = {
            type: linesCopy[numberLine].type,
            value:  linesCopy[numberLine].value.slice(0, linesCopy[numberLine].value.length - value.length)
        }
        setLines(linesCopy);
    };

    const deleteLine = (numberLine, value = '') => {
        //функция срабатывает при нажатии на Backspace, если курсор установлен в начало строки.
        //Строка удаляется, если справа от курсора есть текст - он переносится на предыдущую строку 
        if (numberLine === 0) return;
        const updateLine = lines[numberLine - 1];
        const updateLineValue = updateLine.value + value;
        const linesCopy = [...lines];
        linesCopy[numberLine - 1] = {
            type: checkValueType(updateLineValue),
            value: updateLineValue
        };

        linesCopy.splice(numberLine, 1);
        setLines(linesCopy);
    };

    const onSave = () => {
        const errors = checkErrors(lines);
        if (errors) return setErrors(errors);
        const data = normalizeData(lines);
        replaceSections(fileId, data);
    };

    const onFocusHandler = (numberLine) => {
        setCursorPosition(numberLine);
    };

    return (
        <div className={styles.text__editor__container}>
            {lines.length > 0 && lines.map((line, i) => (
                <Line 
                    key={i} 
                    numberLine={i} 
                    onChangeHandler={onChangeHandler} 
                    addNewLine={addNewLine} 
                    deleteLine={deleteLine}
                    value={line.value} 
                    isFocus={i === cursorPosition} 
                    onFocusHandler={onFocusHandler}
                    type={line.type}
                    isError={errors.includes(elem => elem.index === i)} />
            ))}
            <div className={styles.btn__wrapper}>
                <DefaultBtn value='сохранить' onClickHandler={onSave} />        
            </div>  
            {errors.length > 0 && <ErrorsBar errors={errors} />}
        </div>
    );
};

export default TextEditor