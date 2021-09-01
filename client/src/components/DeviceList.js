import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import { useStore } from '../index';
import DeviceItem from './DeviceItem';
import { observer } from 'mobx-react-lite';

const DeviceList = observer(({isAdminPage, removeDevice}) => {
    const {device} = useStore();

    return (
        <Grid container spacing={3}>
            {device.devices.length ?
                device.devices.map(d => {
                    const brand = device.brands.find(brand => brand.id === d.brandId);
                    const brandName = brand?.name;


                    return (
                        <Grid
                            item
                            xs={3}
                            key={d.id}
                            mt={3}
                        >
                            <DeviceItem
                                device={d}
                                brandName={brandName}
                                isAdminPage={isAdminPage}
                                removeDevice={removeDevice}
                            />
                        </Grid>
                    )
                })
                :
                <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
                    <Typography
                        variant="h4"
                        style={{marginTop: 65}}
                    >
                        Пока нет устройств
                    </Typography>
                </div>
            }
        </Grid>
    )
});

export default DeviceList