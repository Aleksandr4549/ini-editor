import AddNewSectionForm from './AddNewSectionForm/AddNewSectionForm';
import GraphSection from './GraphSection/GraphSection';
import DefaultBtn from '../Buttons/DefaultBtn/DefaultBtn';
import styles from './graphEditor.module.scss';

const GraphEditor = ({sections, addSection, onChangeKeyValueHandler, 
                    isAddSection, toggleIsAddSection, fileId, addNewKey, isAddKey,
                    toggleIsAddKey}) => {

    return (
        <div className={styles.craph__editor__container}>
            {sections.length > 0 && sections.map(section => (
                <GraphSection
                    key={section.sectionId}
                    id={section.sectionId}
                    title={section.sectionTitle.value}
                    keys={section.sectionKeys}
                    onChangeKeyValueHandler={onChangeKeyValueHandler}
                    addNewKey={addNewKey}
                    isAddNewKey={isAddKey}
                    toggleIsAddKey={toggleIsAddKey} />
            ))}

            {isAddSection && <AddNewSectionForm fileId={fileId} addSection={addSection} 
                                                toggleIsAddSection={toggleIsAddSection} />}

            <DefaultBtn 
                onClickHandler={toggleIsAddSection} 
                value={!isAddSection ?'добавить секцию' : 'удалить секцию'} />
        </div>
    );
};

export default GraphEditor;