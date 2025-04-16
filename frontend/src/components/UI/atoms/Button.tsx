import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';

interface BtnProps {
    children: React.ReactNode;
    title?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    to?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    text?: string;
    colors?: {
        bgColor?: string;
        fgColor?: string;
    };
}

const Button: React.FC<BtnProps> = ({
    children,
    title = '',
    variant = 'primary',
    to,
    onClick,
    disabled = false,
    type = 'button',
    text,
    colors,
}) => {
    const muiVariant: MUIButtonProps['variant'] =
        variant === 'primary' ? 'contained' :
            variant === 'secondary' ? 'outlined' :
                'text';

    const bgColor = colors?.bgColor;
    const fgColor = colors?.fgColor;

    return (
        <MUIButton
            component={to ? RouterLink : 'button'}
            to={to}
            variant={muiVariant}
            onClick={onClick}
            disabled={disabled}
            type={to ? undefined : type}
            title={title}
            sx={{
                backgroundColor: variant === 'primary' ? bgColor : 'transparent',
                color: fgColor,
                borderColor: variant === 'secondary' ? fgColor : 'transparent',
                '&:hover': {
                    backgroundColor: variant === 'primary' ? (bgColor ? `${bgColor}CC` : undefined) : 'transparent',
                    color: fgColor ? `${fgColor}CC` : undefined,
                    borderColor: variant === 'secondary' ? (fgColor ? `${fgColor}CC` : undefined) : 'transparent'
                }
            }}
        >
            {children}{
                text && (
                    <span style={{ marginLeft: '8px' }}>{text}</span>
                )
            }
        </MUIButton>
    );
};

export default Button;
