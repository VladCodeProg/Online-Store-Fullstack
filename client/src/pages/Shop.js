import React, { useEffect, useState } from 'react';
import {Container, Grid} from '@material-ui/core';
import TypeSelect from '../components/TypeSelect';
import BrandSelect from '../components/BrandSelect';
import { useStore } from '../index';
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI';
import DeviceList from '../components/DeviceList';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { observer } from 'mobx-react-lite';

const Shop = observer(() => {
    const {device} = useStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices(null, null, 1, device.limit).then(data => {
            device.setDevicesCount(data.count);
            device.setDevices(data.rows);
        }).finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchDevices(device.activeBrand.id, device.activeType.id, device.page, device.limit).then(data => {
            device.setDevicesCount(data.count);
            device.setDevices(data.rows);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [device.page, device.activeType, device.activeBrand]);

    if (loading) return <Loader />

    return (
        <Container>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={3}>
                    <TypeSelect />
                </Grid>
                <Grid item xs={9}>
                    <BrandSelect />
                    <DeviceList />
                    <Pagination />
                </Grid>
            </Grid>
        </Container>
    )
});

export default Shop