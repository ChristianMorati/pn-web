// fetch
const http = fetch;
const extractJson = (res: any) => {
    return res.json();
}

interface IHttpClient {
    request(url: string, options?: RequestInit): Promise<any>;
    extractData(res: Response): any;
}

const BASE_URL = process.env.REACT_APP_API_URL;

class HttpClient implements IHttpClient {
    async request(url: string, options = {}): Promise<any> {
        try {
            const res = await http(BASE_URL + url, options);
            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            const responseObj = this.extractData(res);
            return responseObj;
        } catch (error) {
            console.error(error);
            throw new Error('Request failed');
        }
    }

    extractData(res: any) {
        return extractJson(res);
    }
}

const httpClient = new HttpClient();
export { httpClient, BASE_URL }