import uuid from 'react-uuid';

const SET_FILES = 'SET_FILES';
const OPEN_FILE = 'OPEN_FILE';
const CLOSE_FILE = 'CLOSE_FILE';
const ADD_FILE = 'ADD_FILE';
const DELETE_FILE = 'DELETE_FILE';
const SELECT_FILE = 'SELECT_FILE';

const initialState = {
    openFiles: [],
    fileItems: [],
    currentFileId: ''
}

const editorReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FILES:
            return {...state, fileItems: action.payload};
        case OPEN_FILE:
            return {
                ...state, 
                openFiles: state.openFiles.find(file => file.fileId === action.payload) ? state.openFiles 
                    : [...state.openFiles, ...state.fileItems.filter(file => file.fileId === action.payload)], 
                currentFileId: action.payload
            };
        case CLOSE_FILE:
            return {...state, openFiles: state.openFiles.filter(fileId => fileId !== action.payload)};
        case ADD_FILE:
            return {...state, fileItems: [...state.fileItems, action.payload]};
        case DELETE_FILE:
            return {...state, openFiles: state.fileItems.filter(file => file.id !== action.payload)};
        case SELECT_FILE:
            return {...state, currentFileId: action.payload};
        default:
            return state;
    }
};

const setFiles = (files) => ({type: SET_FILES, payload: files}); 

export const openFile = (id) => ({type: OPEN_FILE, payload: id});

export const closeFile = ({id}) => ({type: CLOSE_FILE, payload: id});

const addFile = (file) => ({type: ADD_FILE, payload: file});

const deleteFile = ({id}) => ({type: DELETE_FILE, payload: id});

export const selectFile = ({id}) => ({type: SELECT_FILE, payload: id});

export const getFiles = () => {
    return (dispatch) => {
        if (localStorage.getItem('files')) {
            const files = JSON.parse(localStorage.files);
            dispatch(setFiles(files));
        }
    }
};

export const createNewFile = (title) => {
    return (dispatch) => {
        if (!title) return;
        const newFile = {
            fileId: uuid(),
            title,
            mode: 'text',
            sections: []
        };

        if (!localStorage.getItem('files')) {
            localStorage.setItem('files', JSON.stringify([]));
        } 

        const storageFiles = JSON.parse(localStorage.getItem('files'));
        const newStorageFiles = JSON.stringify([...storageFiles, newFile]);

        localStorage.setItem('files', newStorageFiles);
        dispatch(addFile(newFile));
    }
};

export const deleteFileTC = (id) => {
    return (dispatch) => {
        localStorage.setItem('files', localStorage.getItem('files').filter(file => file.id !== id));
        dispatch(deleteFile(id));
    }
};

export default editorReducer;