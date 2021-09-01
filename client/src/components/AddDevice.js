import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Collapse, Typography } from '@material-ui/core';
import {useStore} from '../index'
import { AddBox, AddPhotoAlternate, Delete } from '@material-ui/icons';
import { createDevice } from '../http/deviceAPI';
import Alert from './Alert';

const AddDevice = ({open, getDevices, setOpen}) => {
    const {device} = useStore();
    const [typeId, setTypeId] = useState({
        error: false,
        value: ''
    });
    const [brandId, setBrandId] = useState({
        error: false,
        value: ''
    });
    const [infos, setInfos] = useState([]);
    const [file, setFile] = useState({});
    const [fileError, setFileError] = useState('');
    const [price, setPrice] = useState({
        label: 'Название устройства',
        errorMessage: 'Некорректное название устройства',
        value: 0,
        touched: false
    });
    const [name, setName] = useState({
        label: 'Название устройства',
        errorMessage: 'Некорректное название устройства',
        value: '',
        touched: false
    });
    const [showInfosLimit, setShowInfosLimit] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const infosLimit = 30;

    if (openError) setTimeout(() => setOpenError(false), 4000);

    const handleName = value => {
        setName({...name, value, touched: true});
    }

    const handlePrice = value => {
        setPrice({...price, value, touched: true});
    }

    const changeFile = file => {
        const imgTypes = ['png', 'svg', 'jpeg', 'jpg'];
        const fileNameArr = file.name.split('.')
        const fileType = fileNameArr[fileNameArr.length - 1];
        
        if (!imgTypes.some(type => type === fileType)) {
            return setFileError('Неподдерживаемое расширение файла');
        }

        if (fileError) setFileError(false);
        setFile({file, url: URL.createObjectURL(file)});
    }

    const addInfo = () => {
        if (infos.length === infosLimit) {
            return setShowInfosLimit(true);
        }

        setInfos([{
            title: {
                label: 'Название свойства',
                value: '',
                touched: false
            },
            description: {
                label: 'Описание свойства',
                value: '',
                touched: false
            },
            id: Date.now()
        }, ...infos]);
    }

    const handleInfo = (key, value, id) => {
        setInfos(infos.map(i => i.id === id ? {...i, [key]: {...i[key], value, touched: true}} : i));
    }

    const deleteInfo = id => {
        if (showInfosLimit) setShowInfosLimit(false);
        setInfos(infos.filter(i => i.id !== id));
    }

    const addDevice = () => {
        if (!file.file) return setFileError('Нет изображения')
        if (!name.value) return setName({...name, touched: true});
        if (!price.value || price.value < 0) return setPrice({...price, value: 0, touched: true});
        if (!brandId.value) return setBrandId({...brandId, error: true});
        if (!typeId.value) return setTypeId({...typeId, error: true});

        if (infos.some(info => !info.title.value || !info.description.value)) {
            const infosCopy = [...infos];
            infosCopy.forEach(info => {
                if (!info.title.value) info.title.touched = true
                if (!info.description.value) info.description.touched = true
            });

            return setInfos(infosCopy);
        }

        const formData = new FormData();
        formData.append('name', name.value);
        formData.append('price', price.value);
        formData.append('brandId', brandId.value);
        formData.append('typeId', typeId.value);
        formData.append('img', file.file);
        formData.append('info', JSON.stringify(infos));

        createDevice(formData)
            .then(() => {
                getDevices();
                
                setOpen(false);
                setTypeId({
                    error: false,
                    value: ''
                });
                setBrandId({
                    error: false,
                    value: ''
                });
                setInfos([]);
                setFile({});
                setPrice({...price, value: 0, touched: false});
                setName({...price, value: '', touched: false});
            })
            .catch(err => {
                setApiMessage(err.response?.data.message);
                setOpenError(true);    
            });
    }

    return (
        <>
            <Alert
                open={openError}
                errorMessage={apiMessage}
            />
            <Collapse in={open}>
                <div style={{width: '80%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: 'auto'}}>
                    {file.url && file.file ?
                        <div>
                            <img
                                src={file.url}
                                style={{width: 240, borderRadius: 15, display: 'block', marginTop: 30}}
                                alt={file.file.name}
                            />
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    color="error"
                                    sx={{marginTop: 2}}
                                    startIcon={<Delete style={{fontSize: 30}} />}
                                    onClick={() => setFile({})}
                                >
                                    Удалить
                                </Button>
                            </div>
                        </div>
                        :
                        <div style={{display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
                            {fileError && <Typography
                                variant="h5"
                                textAlign="center"
                                sx={{fontWeight: 'bold', marginBottom: 3, color: '#750800'}}
                            >
                                {fileError}
                            </Typography>}
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="button-file"
                                onChange={e => changeFile(e.target.files[0])}
                                type="file"
                            />
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{width: 180,
                                minHeight: 60, fontSize: 20}}
                                startIcon={<AddPhotoAlternate style={{fontSize: 30}} />}
                            >
                                <label htmlFor="button-file" style={{cursor: 'pointer'}}>
                                    Загрузить
                                </label>  
                            </Button>
                        </div>
                    }
                    <div
                        style={{
                            width: 420,
                            minHeight: 250,
                            padding: '25px 35px',
                            borderRadius: 10,
                            outline: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            label={name.label}
                            value={name.value}
                            onChange={e => handleName(e.target.value)}
                            helperText={!name.value && name.touched && name.errorMessage}
                            error={!name.value && name.touched}
                            sx={{marginBottom: 2}}
                            fullWidth
                        />
                        <TextField
                            label={price.label}
                            value={isNaN(price.value) ? 0 : price.value}
                            onChange={e => handlePrice(+e.target.value)}
                            helperText={!price.value && price.touched && price.errorMessage}
                            error={!price.value && price.touched}
                            sx={{marginBottom: 2, width: 220}}
                        />
                        <div style={{display: 'flex'}}>
                            <FormControl
                                style={{marginRight: 40, minWidth: 120}}
                                error={brandId.error}
                            >
                                <InputLabel id="select-label">Бренд</InputLabel>
                                <Select
                                    labelId="select-label"
                                    label="Бренд"
                                    value={brandId.value}
                                    onChange={e => setBrandId({error: false, value: e.target.value})}

                                >
                                    {device.brands.map(brand => (
                                        <MenuItem key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl
                                style={{minWidth: 120}}
                                error={typeId.error}
                            >
                                <InputLabel id="select-label">Тип</InputLabel>
                                <Select
                                    labelId="select-label"
                                    label="Тип"
                                    value={typeId.value}
                                    onChange={e => setTypeId({error: false, value: e.target.value})}
                                >
                                    {device.types.map(type => (
                                        <MenuItem key={type.id} value={type.id}>
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <Button
                            variant="outlined"
                            sx={{marginTop: 2}}
                            size="large"
                            onClick={addInfo}
                            fullWidth
                        >
                            Добавить свойство
                        </Button>
                        <div>
                            {showInfosLimit &&
                                <Typography textAlign="center" variant="h5" sx={{marginTop: 1, marginBottom: 1, color: '#750800', fontWeight: 'bold'}}>
                                    Достигнут лимит свойств
                                </Typography>
                            }
                            {infos.map(info => (
                                <div key={info.id} style={{display: 'flex', marginTop: 15}}>
                                    <TextField
                                        label={info.title.label}
                                        value={info.title.value}
                                        onChange={e => handleInfo('title', e.target.value, info.id)}
                                        error={!info.title.value && info.title.touched}
                                        sx={{width: '50%', marginRight: 2}}
                                    />
                                    <TextField
                                        label={info.description.label}
                                        value={info.description.value}
                                        onChange={e => handleInfo('description', e.target.value, info.id)}
                                        error={!info.description.value && info.description.touched}
                                        sx={{width: '50%', marginRight: 2}}
                                    />
                                    <Button
                                        variant="outlined"
                                        onClick={() => deleteInfo(info.id)}
                                        color="error"
                                        sx={{alignContent: 'flex-end'}}
                                    >
                                        <Delete />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Button
                    sx={{fontWeight: 'bold', fontSize: 18}}
                    startIcon={<AddBox />}
                    onClick={addDevice}
                    variant="outlined"
                    color="success"
                    size="large"
                    fullWidth
                >
                    Добавить
                </Button>
            </Collapse>
        </>
    )
}

export default AddDevice