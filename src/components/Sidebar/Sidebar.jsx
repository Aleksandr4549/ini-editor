import { useState } from 'react';
import { connect } from 'react-redux';

import { createNewFile, openFile } from '../../redux/reducers/editor-reducer';
import { getFile } from '../../redux/reducers/file-reducer';
import AddNewFileBtn from '../Buttons/AddNewFileBtn/AddNewFileBtn';
import styles from './sidebar.module.scss';

const Sidebar = ({files = [], createNewFile, openFile, getFile, currentFileId}) => {
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onChangeHandler = (e) => {
        setInputValue(e.currentTarget.value);
    };

    const changeEditMode = () => setEditMode(!editMode);
    
    const save = () => {
        changeEditMode();
        if (inputValue) {
            createNewFile(inputValue);
        }
        setInputValue('');
    }

    const keyPressHandler = (e) => {
        if (e.code === 'Enter') {
            save();
        }
    };

    const onBlurHandler = () => {
        save();
    };

    const onClickHandler = (id) => {
        openFile(id);
        getFile(id);
    }

    return (
        <div className={styles.sidebar__container}>
            <AddNewFileBtn onClickHandler={changeEditMode} />
            {editMode && <input 
                            value={inputValue} 
                            placeholder='новый файл' 
                            onChange={onChangeHandler}
                            onKeyPress={keyPressHandler}
                            onBlur={onBlurHandler} />
            }

            {files.length > 0 && files.map(file => (
                <div 
                    key={file.fileId} 
                    onClick={() => onClickHandler(file.fileId)}
                    className={currentFileId === file.fileId ? styles.active : ''}>{file.title}</div>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        files: state.editor.fileItems,
        currentFileId: state.editor.currentFileId
    }
};

export default connect(mapStateToProps, {createNewFile, openFile, getFile})(Sidebar);