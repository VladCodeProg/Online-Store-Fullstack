import React from 'react';
import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import { AddShoppingCart, Delete } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { DEVICE_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { createBasketDevice } from '../http/deviceAPI';
import { useStore } from '../index';

const DeviceItem = ({
    device,
    brandName,
    basketDeviceId=false,
    removeBasketDevice=null,
    isAdminPage=null,
    removeDevice=null
}) => {
    const history = useHistory();
    const {user} = useStore();

    const addToBasket = e => {
        e.stopPropagation()
        if (!user.isAuthed) return history.push(LOGIN_ROUTE);
        createBasketDevice(device.id)
    }

    return (
        <Card
            style={{borderRadius: 10, cursor: 'pointer', padding: '12px', borderColor: '#c0c0c0'}}
            variant="outlined"
            onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}
        >
            <img
                src={process.env.REACT_APP_API_URL + '/' + device.img}
                style={{width: basketDeviceId ? 190 : 160, display: 'block', margin: 'auto', borderRadius: 10}}
                alt={device.name}
            />
            <CardContent style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <b style={{color: 'grey'}}>{brandName}</b>
                <b style={{fontSize: 17, marginTop: 5}}>{device.name}</b>
            </CardContent>
            <CardActions>
                <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexGrow: 1,
                        alignItems: 'center'
                    }}
                >
                    {basketDeviceId ? 
                        <Button
                            variant="outlined"
                            color="error"
                            size="large"
                            onClick={e => {
                                e.stopPropagation();
                                removeBasketDevice(basketDeviceId)
                            }}
                        >
                            <Delete />
                        </Button>
                        :
                        isAdminPage ?
                            <Button
                                variant="outlined"
                                color="error"
                                size="large"
                                onClick={e => {
                                    e.stopPropagation();
                                    removeDevice(device.id)
                                }}
                            >
                                <Delete />
                            </Button>
                            :
                            <Button
                                variant="outlined"
                                onClick={addToBasket}
                            >
                                <AddShoppingCart />
                            </Button>
                    }
                    <b style={{fontSize: 18, color: '#3b3b3b'}}>
                        {device.price} ₽
                    </b>
                </div>
            </CardActions>
        </Card>
    );
}

export default DeviceItem