import React from 'react';
import styles from '../../../assets/styles/Elements/InputField.module.scss';
import { ClassNames } from '@emotion/react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    placeholder?: string;
    id?: string;
    value?: string;
    searchIconVisible?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    name: string
    classes?: string
}

const InputField: React.FC<InputProps> = ({
    type = 'text',
    placeholder = '',
    id,
    value = '',
    onChange,
    required,
    name,
    classes,
}) => {
    return (
        <div className={styles.INPUT_FIELD_CONTAINER}>
            <input
                id={id}
                className={`${styles.INPUT_FIELD} ${classes}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                name={name}
            />
        </div>
    );
};

export default InputField;
