import {makeAutoObservable} from 'mobx'

export class UserStore {
    constructor() {
        this._isAuthed = false;
        this._user = {};
        makeAutoObservable(this);
    }
    
    setIsAuth(bool) {
        this._isAuthed = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuthed() {
        return this._isAuthed;
    }

    get user() {
        return this._user;
    }
}