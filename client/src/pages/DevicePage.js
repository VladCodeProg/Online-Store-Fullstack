import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, Container, Grid, Rating, Typography } from '@material-ui/core';
import { AccountBalanceWallet, AddShoppingCart, Star } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { checkRating, createBasketDevice, createRating, fetchDevice } from '../http/deviceAPI';
import Loader from '../components/Loader';
import { useStore } from '../index';
import { LOGIN_ROUTE } from '../utils/consts';

const DevicePage = () => {
    const {user} = useStore();
    const [device, setDevice] = useState({});
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        checkRating(id)
            .then(data => setRate(data && data.rate))
            .catch(err => console.error(err));
        fetchDevice(id)
            .then(data => setDevice(data))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchDevice(id)
            .then(data => setDevice(data))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rate]);

    const setRating = rate => {
        if (!user.isAuthed) return history.push(LOGIN_ROUTE);
        createRating(device.id, rate).then(() => setRate(rate));
    }

    const addToBasket = () => {
        if (!user.isAuthed) return history.push(LOGIN_ROUTE);
        createBasketDevice(device.id);
    }

    if (loading) return <Loader />

    return (
        <Container>
            <Grid container spacing={2} mt={1}>
                <Grid item xs={7}>
                    <img
                        src={process.env.REACT_APP_API_URL + '/' + device.img}
                        style={{width: '60%', display: 'block', margin: 'auto'}}
                        alt={device.name}
                    />
                </Grid>
                <Grid item xs={5} style={{display: 'flex', alignItems: 'center'}}>
                    <Card
                        variant="outlined"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderColor: '#c0c0c0',
                            width: 450,
                            minHeight: 290
                        }}
                    >
                        <CardContent>
                            <Typography variant="h3" style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                                {device.name}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="h3" style={{color: 'rgb(59, 59, 59)'}}>
                                {device.price} ₽
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<AccountBalanceWallet />}
                                size="large"
                            >
                                Купить
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<AddShoppingCart />}
                                size="large"
                                onClick={addToBasket}
                            >
                                В корзину
                            </Button>
                        </CardActions>
                        <Typography variant="h3" style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{marginRight: 7}}>{device.rating}</span>
                            <Star style={{fill: '#ffb300'}} fontSize="25" />
                        </Typography>
                        <Rating
                            size="large"
                            value={rate}
                            onChange={(e, value) => setRating(value)}
                            readOnly={rate ? true : false}
                            style={{marginBottom: 20}}
                        />
                    </Card>
                </Grid>
            </Grid>
            {device.info.length > 0 && (
                <Card
                    variant="outlined"
                    style={{
                        borderColor: '#c0c0c0',
                        marginTop: 30
                    }}
                >
                    <CardContent>
                        <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                            {device.info.map(i => (
                                <li key={i.id} style={{
                                    height: 30,
                                    background: i.id % 2 ? '#e6e6e6' : '#fff',
                                    borderRadius: 5,
                                    fontSize: 24,
                                    padding: 10,
                                    textTransform: 'uppercase',
                                    display: 'flex'
                                }}>
                                    <span style={{display: 'block', width: '50%'}}>
                                        {i.title}
                                    </span>
                                    <span>
                                        {i.description}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </Container>
    )
}

export default DevicePage