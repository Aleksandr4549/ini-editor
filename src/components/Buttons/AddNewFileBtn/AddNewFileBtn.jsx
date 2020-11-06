import {ReactComponent as AddFileIcon} from '../../../assets/icons/addFileIcon.svg';
import styles from './addNewFileBtn.module.scss';

const AddNewFileBtn = ({onClickHandler}) => {
    return  <div className={styles.add__file__btn} onClick={onClickHandler}><AddFileIcon /></div>
};

export default AddNewFileBtn;