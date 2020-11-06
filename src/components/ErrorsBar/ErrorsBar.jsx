import styles from './errorsBar.module.scss';

const ErrorsBar = ({errors}) => {
    return  (
        <div> 
            <h5 className={styles.errors__title}>Ошибки:</h5>
            {errors.length === 0 && <div className={styles.no__errors}>Ошибок не обнаружено</div>}
            {errors.length > 0 && errors.map((error, i) => {
                return <div key={i} className={styles.errors__bar}>
                    <span>строка {error.index + 1}: </span>
                    <span>{error.error}</span>
                </div>
            })}
        </div>
    );
};

export default ErrorsBar;