import {makeAutoObservable} from 'mobx'

export class DeviceStore {
    constructor() {
        this._devices = [];
        this._basketDevices = [];
        this._types = [];
        this._brands = [];
        this._activeType = {};
        this._activeBrand = {};
        this._devicesCount = 0;
        this._page = 1;
        this._limit = 10;
        makeAutoObservable(this);
    }

    setBrands(brands) {
        this._brands = brands;
    }
    
    setTypes(types) {
        this._types = types;
    }

    setActiveType(type) {
        this.setPage(1);
        this._activeType = type;
    }

    setActiveBrand(brand) {
        this.setPage(1);
        this._activeBrand = brand;
    }

    setDevices(devices) {
        this._devices = devices;
    }

    setBasketDevices(devices) {
        this._basketDevices = devices;
    }

    setDevicesCount(count) {
        this._devicesCount = count
    }

    setPage(page) {
        this._page = page
    }

    get types() {
        return this._types;
    }

    get brands() {
        return this._brands;
    }

    get activeType() {
        return this._activeType;
    }

    get activeBrand() {
        return this._activeBrand;
    }

    get devices() {
        return this._devices;
    }

    get basketDevices() {
        return this._basketDevices
    }

    get limit() {
        return this._limit
    }

    get devicesCount() {
        return this._devicesCount
    }

    get page() {
        return this._page
    }
}