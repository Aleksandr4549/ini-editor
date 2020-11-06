import { useState } from 'react';

import SectionKey from '../SectionKey/SectionKey';
import AddNewKeyForm from '../AddNewKeyForm/AddNewKeyForm';
import DefaultBtn from '../../Buttons/DefaultBtn/DefaultBtn';

const GraphSection = ({id, title, keys, onChangeKeyValueHandler, addNewKey}) => {
    const [isAddNewKey, setIsAddNewKey] = useState(false);

    const toggleIsAddNewKey = () => {
        setIsAddNewKey(!isAddNewKey);
    }

    const onChangeKey = (keyId, keyValue, value) => {
        const newValue = `${keyValue}=${value}`;
        onChangeKeyValueHandler(id, keyId, newValue)
    };

    const onChangeValueTypeNumber = (keyId, value, fullKeyValue) => {
        let newValue = '';
        let isFindNumber = false;

        for (let sym of fullKeyValue) {
            if (isFindNumber && sym !== ' ' && !isNaN(sym)) continue;
            if (!isFindNumber && sym !== ' ' && !isNaN(sym)) {
                isFindNumber = true;
                newValue += value;
                continue;
            }
            newValue += sym;
        }
        
        return onChangeKeyValueHandler(id, keyId, newValue);
    };

    const addKey = (value) => {
        addNewKey(id, value);
        setIsAddNewKey(false);
    };

    return (
        <div>
            <h4>{title.slice(1, title.length - 1)}</h4>
            {keys.map(key => <SectionKey 
                                key={key.keyId}
                                id={key.keyId} 
                                keyValue={key.value.keyValue.split('=')[0]} 
                                value={key.value.keyType === 'number' ? +key.value.keyValue.replace(/[^0-9]/g, "")  
                                                                      : key.value.keyValue.split('=')[1]}
                                keyType={key.value.keyType}
                                onChangeKey={onChangeKey}
                                onChangeValue={onChangeKey}
                                onChangeValueNumber={onChangeValueTypeNumber}
                                fullValue={key.value.keyValue} />
            )}
            {isAddNewKey && <AddNewKeyForm addNewKey={addKey} />}
            <DefaultBtn onClickHandler={toggleIsAddNewKey} value={!isAddNewKey ? 'добавить ключ' : 'убрать ключ'} />
        </div>
    );
};

export default GraphSection;