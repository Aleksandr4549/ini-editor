import uuid from 'react-uuid';

const SET_FILE = 'SET_FILE';
const ADD_NEW_SECTION = 'ADD_NEW_SECTION'; 
const DELETE_SECTION = 'DELETE_SECTION'; 
const ADD_NEW_KEY = 'ADD_NEW_KEY'; 
const CHANGE_KEY = 'CHANGE_KEY';
const REPLACE_SECTIONS_FILE = 'REPLACE_SECTIONS_FILE';

const initialState = {};

const fileReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FILE:
            return action.payload;
        case ADD_NEW_SECTION: 
            return {...state, sections: [...state.sections, action.payload]};
        case DELETE_SECTION: 
            return {...state, sections: state.sections.filter(section => section.id !== action.payload)};
        case ADD_NEW_KEY:
            const updateSection = state.sections.filter(section => action.sectionId === section.sectionId)[0];
            updateSection.sectionKeys.push(action.key); 
            return {
                ...state, 
                sections: state.sections.map(section => (
                    section.sectionId === action.sectionId ? updateSection : section)
                )
            };
        case CHANGE_KEY:
            return {
                ...state, 
                sections: state.sections.map(section => {
                    if (section.sectionId === action.sectionId) {
                        section.sectionKeys = section.sectionKeys.map(key => {
                            if (key.keyId === action.keyId ) {
                                return {...key, value: {...key.value, keyValue: action.newValue}};
                            } 
                            return key;
                        })
                }
                return section;
            })};
        case REPLACE_SECTIONS_FILE:
            return {...state, sections: action.payload};
        default:
            return state;
    }
};

const setFile = (file) => ({type: SET_FILE, payload: file});

const addNewSection = (section) => ({type: ADD_NEW_SECTION, payload: section});

const addNewKey = (sectionId, key) => {
    return {
        type: ADD_NEW_KEY,
        sectionId,
        key
    }
};

const changeKeySection = (sectionId, keyId, newValue) => {
    return {
        type: CHANGE_KEY,
        sectionId,
        keyId,
        newValue
    }
}

const replaceSectionsFile = (newSections) => ({type: REPLACE_SECTIONS_FILE, payload: newSections});

export const getFile = (id) => {
    return (dispatch) => {
        const files = JSON.parse(localStorage.getItem('files'));
        const file = files.filter(file => file.fileId === id)[0];

        if (file) {
            dispatch(setFile(file));
        }
    }
};

export const addSection = (fileId, section) => {
    return (dispatch) => {
        section.sectionId = uuid();
        section.sectionTitle = {
            type: 'title',
            value: `[${section.sectionTitle}]`
        }

        if (!section.sectionKeys) {
            section.sectionKeys = [];
        }

        section.sectionKeys = section.sectionKeys.map(key => {
            return {
                keyId: uuid(),
                type: 'key',
                value: {
                    keyType: isNaN(key.split('=')[1]) ? 'string' : 'number',
                    keyValue: key 
                }
            }
        });

        const files = JSON.parse(localStorage.getItem('files'));
        
        files.forEach(file => {
            if (file.fileId === fileId) {
                file.sections.push(section);
            }
        });

        localStorage.setItem('files', JSON.stringify(files));
        dispatch(addNewSection(section));
    }
};

export const addKey = (fileId, sectionId, value) => {
    return (dispatch) => {
        if (!value) return;
        const newKey = {};

        newKey.keyId = uuid();
        newKey.type = 'key';
        newKey.value = {
            keyType: isNaN(value.split('=')[1]) ? 'string' : 'number',
            keyValue: value
        };

        const files = JSON.parse(localStorage.getItem('files'));

        files.forEach(file => {
            if (file.fileId === fileId) {
                file.sections.forEach(section => {
                    if (section.sectionId === sectionId) {
                        section.sectionKeys.push(newKey);
                    }
                })
            }
        });

        localStorage.setItem('files', JSON.stringify(files));
        dispatch(addNewKey(sectionId, newKey));
    }
};

export const replaceSections = (fileId, newSections) => {
    return (dispatch) => {
        newSections.forEach(section => {
            section.sectionId = uuid();
            section.sectionKeys.forEach(key => {
                key.keyId = uuid();
            })
        });

        let files = JSON.parse(localStorage.getItem('files'));

        if (!files) files = [];

        const newFiles = files.map(file => {
            if (file.fileId === fileId) {
                file.sections = newSections;
            }
            return file;
        });

        localStorage.setItem('files', JSON.stringify(newFiles));
        dispatch(replaceSectionsFile(newSections));
    }
};

export const changeKeyValue = (fileId, sectionId, keyId, newValue) => {
    return (dispatch) => {
        const files = JSON.parse(localStorage.getItem('files'));

        files.forEach(file => {
            if (file.fileId === fileId) {
                file.sections = file.sections.map(section => {
                    if (section.sectionId === sectionId) {
                        section.sectionKeys.forEach(key => {
                            if (key.keyId === keyId) {
                                key.value.keyValue = newValue;
                            }
                        }); 
                    }
                    return section;
                })
            }
        });

        localStorage.setItem('files', JSON.stringify(files));
        dispatch(changeKeySection(sectionId, keyId, newValue));
    }
};

export default fileReducer;