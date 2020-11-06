import styles from './defaultBtn.module.scss';

const DefaultBtn = ({value, onClickHandler, isDisabled = false}) => {
    return  (
        <button 
            onClick={onClickHandler} 
            className={isDisabled ? styles.disabled__btn : styles.default__btn} 
            disabled={isDisabled}>{value}
        </button>
    );
};

export default DefaultBtn;