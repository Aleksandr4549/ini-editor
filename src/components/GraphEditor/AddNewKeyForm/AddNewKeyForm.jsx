import { useState } from 'react';

import DefaultBtn from '../../Buttons/DefaultBtn/DefaultBtn';
import styles from './addNewKey.module.scss';

const AddNewKeyForm = ({addNewKey}) => {
    const [keyName, setKeyName] = useState('');
    const [keyValue, setKeyValue] = useState('');

    const onChangeKeyNameHandler = (e) => {
        setKeyName(e.currentTarget.value);
    };

    const onChangeKeyValueHandler = (e) => {
        setKeyValue(e.currentTarget.value);
    };

    const save = () => {
        const key = `${keyName}=${keyValue}`;
        addNewKey(key);
        setKeyName('');
        setKeyValue('');
    }

    return (
        <div className={styles.add__key__container}>
            <input 
                type='text' 
                placeholder='введите имя ключа' 
                value={keyName} 
                onChange={onChangeKeyNameHandler} />
            <span>=</span>
            <input 
                type='text' 
                placeholder='введите значение ключа' 
                value={keyValue} 
                onChange={onChangeKeyValueHandler} />
            <DefaultBtn onClickHandler={save} value='сохранить' isDisabled={!keyName || !keyValue} />
        </div>
    );
};

export default AddNewKeyForm;