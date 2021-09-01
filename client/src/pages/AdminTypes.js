import React, { useEffect, useState } from 'react';
import { Button, Card, Container, TextField, Typography } from '@material-ui/core';
import { createType, deleteType, fetchTypes } from '../http/deviceAPI';
import Alert from '../components/Alert';
import { Delete } from '@material-ui/icons';
import Loader from '../components/Loader';

const AdminTypes = () => {
    const [type, setType] = useState({
        label: 'Название типа',
        errorMessage: 'Некорректное название типа',
        value: '',
        touched: false
    });
    
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [apiMessage, setApiMessage] = useState(null);

    if (openError) setTimeout(() => setOpenError(false), 4000);

    const getTypes = () => {
        fetchTypes()
            .then(data => setTypes(data.reverse()))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getTypes();
    }, []);

    const handleInput = e => {
        setType({...type, value: e.target.value, touched: true});
    }

    const addType = e => {
        e.preventDefault();
        createType(type.value.trim())
            .then(() => {
                getTypes();
                setType({...type, value: '', touched: false});
            })
            .catch(err => {
                setApiMessage(err.response?.data.message);
                setOpenError(true);    
            })
    }

    const removeType = id => {
        deleteType(id).then(() => getTypes());
    }

    return (
        <Container>
            <Alert
                open={openError}
                errorMessage={apiMessage}
            />
            <form style={{display: 'flex', flexDirection: 'column', marginTop: 30}}>
                <TextField
                    value={type.value}
                    label={type.label}
                    helperText={type.touched && !type.value && type.errorMessage}
                    error={type.touched && !type.value}
                    onChange={e => handleInput(e)}
                    style={{flexGrow: 1}}
                />
                <Button
                    variant="outlined"
                    type="submit"
                    onClick={e => addType(e)}
                    size="large"
                    style={{marginTop: 15}}
                >
                    Добавить
                </Button>
            </form>
            <div>
                {types.length ?
                    types.map(type =>
                        <Card
                            key={type.id}
                            variant="outlined"
                            style={{borderRadius: 10, cursor: 'pointer', padding: 18, borderColor: '#c0c0c0', marginTop: 12, display: 'flex', justifyContent: 'space-between'}}
                        >
                            <Typography variant="h5">
                                {type.name}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Delete />}
                                onClick={() => removeType(type.id)}
                            >
                                Удалить тип
                            </Button>
                        </Card>
                    )
                    :
                    loading ? 
                        <Loader />
                        :
                        <Typography
                            variant="h4"
                            textAlign="center"
                            mt={5}
                        >
                            Нет типов
                        </Typography>
                }
            </div>
        </Container>
    )
}

export default AdminTypes