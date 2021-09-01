import React from 'react';
import { Collapse, Alert as MaterialAlert, AlertTitle } from '@material-ui/core';

const Alert = ({open, errorMessage}) => {
    return (
        <Collapse in={open}>
            <MaterialAlert
                severity="error"
                style={{width: 410, margin: '20px auto 0', border: '1px solid #880000'}}
            >
                <AlertTitle>Ошибка</AlertTitle>
                {errorMessage}
            </MaterialAlert>
        </Collapse>
    )
}

export default Alert