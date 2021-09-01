import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useStore } from '../index';
import DeviceItem from '../components/DeviceItem';
import { observer } from 'mobx-react-lite';
import { deleteBasketDevice, fetchBasketDevices, fetchBrands } from '../http/deviceAPI';
import { AccountBalanceWallet, Delete } from '@material-ui/icons';
import Loader from '../components/Loader';

const Basket = observer(() => {
    const {device} = useStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBasketDevices().then(data => device.setBasketDevices(data));
        fetchBrands()
            .then(data => device.setBrands(data))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const priceSum = device.basketDevices.reduce((total, d) => total + d.device.price, 0);

    const removeBasketDevice = id => {
        deleteBasketDevice(id).then(() => {
            fetchBasketDevices().then(data => device.setBasketDevices(data));
        });
    }

    const removeAll = () => {
        device.basketDevices.forEach(device => deleteBasketDevice(device.id));
        device.setBasketDevices([]);
    }

    if (loading) return <Loader />

    return (
        <Container>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 20}}>
                <div>
                    <Button
                        variant="outlined"
                        size="large"
                        style={{marginRight: 14}}
                        startIcon={<AccountBalanceWallet />}
                        color="secondary"
                    >
                        Купить все
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        size="large"
                        startIcon={<Delete />}
                        onClick={removeAll}
                    >
                        Очистить все
                    </Button>
                </div>
                <Typography variant="h4" style={{fontWeight: 'bold'}}>
                    <span style={{fontSize: 25}}>Общая стоимость:</span> {priceSum} ₽
                </Typography>
            </div>
            <Grid
                container
                mt={1}
                spacing={4}
            >
                {device.basketDevices.length ?
                    device.basketDevices.map(d => {
                        const brand = device.brands.find(brand => brand.id === d.device.brandId);
                        const brandName = brand?.name;

                        return (
                            <Grid item key={d.id} xs={3}>
                                <DeviceItem
                                    basketDeviceId={d.id}
                                    device={d.device}
                                    brandName={brandName}
                                    removeBasketDevice={removeBasketDevice}
                                />
                            </Grid>
                        )
                    })
                    :
                    <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1}}>
                        <Typography
                            variant="h4"
                            style={{marginTop: 50}}
                        >
                            Пока нет устройств
                        </Typography>
                    </div>
                }
            </Grid>
        </Container>
    )
});

export default Basket