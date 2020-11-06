import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Sidebar from './components/Sidebar/Sidebar';
import EditorContainer from './components/Editor/EditorContainer';
import { getFiles } from './redux/reducers/editor-reducer';
import styles from './app.module.scss';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFiles());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <div className={styles.app__container}>
        <Sidebar />
        <EditorContainer />
    </div>
    );
}

export default App;