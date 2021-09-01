import {$host, $authHost} from './index';

const fetchTypes = async () => {
    const {data} = await $host.get('/api/type');
    return data;
}

const createType = async name => {
    const {data} = await $authHost.post('/api/type', {name});
    return data;
}

const deleteType = async id => {
    const {data} = await $authHost.delete(`/api/type/${id}`);
    return data;
}

const fetchBrands = async () => {
    const {data} = await $host.get('/api/brand');
    return data;
}

const createBrand = async name => {
    const {data} = await $authHost.post('/api/brand', {name});
    return data;
}

const deleteBrand = async id => {
    const {data} = await $authHost.delete(`/api/brand/${id}`);
    return data;
}

const fetchDevices = async (brandId, typeId, page, limit) => {
    const {data} = await $host.get('/api/device', {
        params: {
            brandId, typeId, page, limit
        }
    });
    return data;
}

const fetchDevice = async id => {
    const {data} = await $host.get(`/api/device/${id}`);
    return data;
}

const createDevice = async device => {
    const {data} = await $authHost.post('/api/device', device);
    return data;
}

const deleteDevice = async id => {
    const {data} = await $authHost.delete(`/api/device/${id}`);
    return data;
}

const fetchBasketDevices = async () => {
    const {data} = await $authHost.get('/api/basket');
    return data;
}

const createBasketDevice = async deviceId => {
    const {data} = await $authHost.post('/api/basket', {
        deviceId
    });
    return data;
}

const deleteBasketDevice = async id => {
    const {data} = await $authHost.delete(`/api/basket/${id}`);
    return data;
}

const fetchRating = async id => {
    const {data} = await $host.get(`/api/rating/${id}`);
    return data
}

const createRating = async (deviceId, rate) => {
    const {data} = await $authHost.post('/api/rating', {deviceId, rate});
    return data
}

const checkRating = async deviceId => {
    const {data} = await $authHost.get(`/api/rating/${deviceId}`);
    return data
}

export {
    fetchTypes,
    fetchBrands,
    fetchDevices,
    fetchDevice,
    fetchBasketDevices,
    createBasketDevice,
    deleteBasketDevice,
    fetchRating,
    createRating,
    checkRating,
    createType,
    deleteType,
    createBrand,
    deleteBrand,
    deleteDevice,
    createDevice
}