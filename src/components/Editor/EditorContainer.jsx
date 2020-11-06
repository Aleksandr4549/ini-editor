import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import TextEditor from '../TextEditor/TextEditor';
import GraphEditor from '../GraphEditor/GraphEditor';
import { addSection, replaceSections, changeKeyValue, addKey } from '../../redux/reducers/file-reducer';
import checkIsEmptyObject from '../../utils/checkIsEmptyObj';
import styles from './editor.module.scss';

const EditorContainer = ({file, addSection, replaceSections, changeKeyValue, addKey}) => {
    const [currentFile, setCurrentFile] = useState(null);
    const [mode, setMode] = useState('text mode');
    const [isAddSection, setIsAddSection] = useState('');
    const [isAddKey, setIsAddKey] = useState('');

    useEffect(() => {
        if (checkIsEmptyObject(file)) return;
        setCurrentFile(file);
    }, [file.fileId]);
    
    const changeModeHandler = (e) => {
        setMode(e.currentTarget.value);
    }; 

    const onChangeKeyValueHandler = (sectionId, keyId, newValue) => {
        changeKeyValue(currentFile.fileId, sectionId, keyId, newValue);
    };

    const toggleIsAddSection = () => {
        setIsAddSection(!isAddSection);
    };

    const toggleIsAddKey = () => {
        setIsAddKey(!isAddKey);
    };

    const addNewKey = (sectionId, value) => {
        addKey(currentFile.fileId, sectionId, value);
        setIsAddKey(false);
    };

    return (
        <div className={styles.editor__container}>
            {currentFile && 
                <div className={styles.select__mode__container}>
                    <select value={mode} onChange={changeModeHandler}>
                        <option value='text mode'>text mode</option>
                        <option value='graph mode'>graph mode</option>
                    </select>
                </div>
            }
            {currentFile && mode === 'text mode' && <TextEditor 
                                        fileId={file.fileId}
                                        sections={file.sections}
                                        replaceSections={replaceSections} />}

            {currentFile && mode === 'graph mode' && <GraphEditor 
                                        sections={file.sections}
                                        addSection={addSection}
                                        isAddSection={isAddSection}
                                        toggleIsAddSection={toggleIsAddSection}
                                        onChangeKeyValueHandler={onChangeKeyValueHandler}
                                        fileId={currentFile.fileId}
                                        addNewKey={addNewKey}
                                        isAddKey={isAddKey}
                                        toggleIsAddKey={toggleIsAddKey} />}
        </div>
    );
};

const mapStateToProps = (state) => ({file: state.file});

export default connect(mapStateToProps, {addSection, replaceSections, changeKeyValue, addKey})(EditorContainer);