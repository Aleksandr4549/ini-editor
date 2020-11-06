import styles from './sectionKey.module.scss';

const SectionKey = ({id, keyValue, value, keyType, onChangeKey,
                     onChangeValue, fullValue, onChangeValueNumber}) => {
    const onChangeKeyHandler = (e) => {
        onChangeKey(id, e.currentTarget.value, value);
    };

    const onChangeValueHandler = (e) => {
        onChangeValue(id, keyValue, e.currentTarget.value);
    };

    const onChangeValueTypeNumberHandler = (e) => {
        onChangeValueNumber(id, e.currentTarget.value, fullValue);
    };


    return (
        <div className={styles.section__key__container}>
            <input className={styles[keyType]} type='text' value={keyValue} onChange={onChangeKeyHandler} />
            <span className={styles[keyType]}>=</span>
            <input
                className={styles[keyType]} 
                type={keyType === 'string' ? 'text' : 'number'} 
                value={value}
                onChange={keyType === 'string' ? onChangeValueHandler : onChangeValueTypeNumberHandler} />
        </div>
    );
};

export default SectionKey;