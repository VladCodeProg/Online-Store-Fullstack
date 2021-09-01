import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 70}}>
            <CircularProgress />
        </div>
    )
}

export default Loader