import React, { useEffect, useState } from 'react';
import { Button, Card, Container, TextField, Typography } from '@material-ui/core';
import { createBrand, deleteBrand, fetchBrands } from '../http/deviceAPI';
import Alert from '../components/Alert';
import { Delete } from '@material-ui/icons';
import Loader from '../components/Loader';

const AdminBrands = () => {
    const [brand, setBrand] = useState({
        label: 'Название бренда',
        errorMessage: 'Некорректное название бренда',
        value: '',
        touched: false
    });
    
    const [loading, setLoading] = useState(true);
    const [brands, setBrands] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [apiMessage, setApiMessage] = useState(null);

    if (openError) setTimeout(() => setOpenError(false), 4000);

    const getBrands = () => {
        fetchBrands()
            .then(data => setBrands(data.reverse()))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getBrands();
    }, []);

    const handleInput = e => {
        setBrand({...brand, value: e.target.value, touched: true});
    }

    const addBrand = e => {
        e.preventDefault();
        createBrand(brand.value.trim())
            .then(() => {
                getBrands();
                setBrand({...brand, value: '', touched: false});
            })
            .catch(err => {
                setApiMessage(err.response?.data.message);
                setOpenError(true);    
            });
    }

    const removeBrand = id => {
        deleteBrand(id).then(() => getBrands());
    }

    return (
        <Container>
            <Alert
                open={openError}
                errorMessage={apiMessage}
            />
            <form style={{display: 'flex', flexDirection: 'column', marginTop: 30}}>
                <TextField
                    value={brand.value}
                    label={brand.label}
                    helperText={brand.touched && !brand.value && brand.errorMessage}
                    error={brand.touched && !brand.value}
                    onChange={e => handleInput(e)}
                    style={{flexGrow: 1}}
                />
                <Button
                    variant="outlined"
                    type="submit"
                    onClick={e => addBrand(e)}
                    size="large"
                    style={{marginTop: 15}}
                >
                    Добавить
                </Button>
            </form>
            <div>
                {brands.length ?
                    brands.map(brand =>
                        <Card
                            key={brand.id}
                            variant="outlined"
                            style={{borderRadius: 10, cursor: 'pointer', padding: 18, borderColor: '#c0c0c0', marginTop: 12, display: 'flex', justifyContent: 'space-between'}}
                        >
                            <Typography variant="h5">
                                {brand.name}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Delete />}
                                onClick={() => removeBrand(brand.id)}
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
                            Нет брендов
                        </Typography>
                }
            </div>
        </Container>
    )
}

export default AdminBrands