import { useRef, useLayoutEffect } from 'react';

import styles from './line.module.scss';

const Line = ({type, value, onChangeHandler, addNewLine, deleteLine, 
               numberLine, isFocus, onFocusHandler, isError}) => {
    const inputElem = useRef(null);

    useLayoutEffect(() => {
        const inputCurrent = inputElem.current;

        if (inputElem !== null) {
            if (isFocus && inputElem.current) inputElem.current.focus();

            const pressKeyHandler = (e) => {
                if (e.code === 'Enter') {
                    return (() => {
                        onFocusHandler(numberLine + 1);
                        addNewLine(numberLine, value.slice(e.currentTarget.selectionEnd));                      
                    })();
                }

                if (e.code === 'Backspace') {
                    return (() => {
                        if (e.target.selectionStart === 0) {
                            e.preventDefault();
                            onFocusHandler(numberLine - 1);
                            deleteLine(numberLine, value.slice(e.target.selectionStart)); 
                        }        
                    })();
                }

                if (e.code === 'ArrowUp') {
                    return (() => {
                        onFocusHandler(numberLine - 1);
                    })();
                }

                if (e.code === 'ArrowDown') {
                    return (() => {
                        onFocusHandler(numberLine + 1);
                    })();
                }
            }
            inputCurrent.addEventListener('keydown', pressKeyHandler);
            return () => inputCurrent.removeEventListener('keydown', pressKeyHandler);
        }
    });

    const onChange = (e) => {
        onChangeHandler(numberLine, e.currentTarget.value);
    }

    const onClickHandler = () => {
        onFocusHandler(numberLine)
    }

    return (
        <div className={isFocus ? styles.current__line : styles.text__editor__container}>
            <input 
                className={isError ? styles.error : styles[type]}
                onChange={onChange}
                onClick={onClickHandler}
                ref={inputElem}
                value={value}>
            </input>
        </div>
    );
};

export default Line;