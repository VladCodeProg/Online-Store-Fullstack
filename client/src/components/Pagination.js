import React from 'react';
import {Pagination as Pages} from '@material-ui/core';
import { useStore } from '../index';
import { observer } from 'mobx-react-lite';

const Pagination = observer(() => {
    const {device} = useStore();
    const pagesCount = Math.ceil(device.devicesCount / device.limit);

    return (
        <Pages
            count={pagesCount}
            page={device.page}
            onChange={(e, value) => device.setPage(value)}
            color="primary"
            style={{marginTop: 50}}
        />
    )
});

export default Pagination