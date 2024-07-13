import { BASE_URL_API } from '../services/http-client';

class SocketIoInit {
    baseURL: string;

    constructor() {
        this.baseURL = BASE_URL_API || 'http://localhost:3000';
    }
}

export default SocketIoInit;
