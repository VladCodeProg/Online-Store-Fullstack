import React, { useEffect, useState } from 'react';
import {Button, Container, Grid} from '@material-ui/core';
import { useStore } from '../index';
import Loader from '../components/Loader';
import { deleteDevice, fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import BrandSelect from '../components/BrandSelect';
import DeviceList from '../components/DeviceList';
import Pagination from '../components/Pagination';
import TypeSelect from '../components/TypeSelect';
import { observer } from 'mobx-react-lite';
import AddDevice from '../components/AddDevice';

const AdminDevices = observer(() => {
    const {device} = useStore();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices(null, null, 1, device.limit).then(data => {
            device.setDevicesCount(data.count);
            device.setDevices(data.rows);
        }).finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getDevices = () => {
        fetchDevices(device.activeBrand.id, device.activeType.id, device.page, device.limit).then(data => {
            device.setDevicesCount(data.count);
            device.setDevices(data.rows);
        });
    }

    useEffect(() => {
        getDevices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [device.page, device.activeType, device.activeBrand, device.devicesCount]);

    const removeDevice =  id => {
        deleteDevice(id).then(() => getDevices());
    }

    if (loading) return <Loader />

    return (
        <Container>
            <Button
                style={{marginTop: 20}}
                onClick={() => setOpen(!open)}
                variant="outlined"
                sx={{fontWeight: 'bold', fontSize: 18}}
                color={open ? 'error' : 'primary'}
                size="large"
                fullWidth
            >
                {open ? 'Скрыть меню' : 'Добавить устройство'}
            </Button>
            <AddDevice
                open={open}
                setOpen={setOpen}
                getDevices={getDevices}
            />
            <Grid container spacing={2} mt={1}>
                <Grid item xs={3}>
                    <TypeSelect />
                </Grid>
                <Grid item xs={9}>
                    <BrandSelect />
                    <DeviceList
                        removeDevice={removeDevice}
                        isAdminPage
                    />
                    <Pagination />
                </Grid>
            </Grid>
        </Container>
    )
});

export default AdminDevices