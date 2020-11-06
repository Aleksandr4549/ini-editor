import { useState } from 'react';

import DefaultBtn from '../../Buttons/DefaultBtn/DefaultBtn';
import styles from './addNewSection.module.scss';

const AddNewSectionForm = ({fileId, addSection, toggleIsAddSection}) => {
    const [sectionTitle, setSectionTitle] = useState('');

    const onChangeHandler = (e) => {
        setSectionTitle(e.currentTarget.value);
    };

    const save = () => {
        const newSection = {
            sectionTitle,
            sectionKeys: []
        };

        addSection(fileId, newSection);
        setSectionTitle('');
        toggleIsAddSection();
    };

    return (
        <div className={styles.add__section__container}>
            <input 
                className={styles.add__section__title} 
                type='text' placeholder='введите заголовок секции' 
                value={sectionTitle} onChange={onChangeHandler} />

            <DefaultBtn onClickHandler={save} value='сохранить' isDisabled={!sectionTitle} />
        </div>
    );
};

export default AddNewSectionForm;