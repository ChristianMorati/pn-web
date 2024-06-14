// fetch
const http = fetch;
const extractJson = (res: any) => {
    return res.json();
}

// axios
// const http = axios;
// const extractJson = (res: any) => {
//     return res.data;
// }

interface IHttpClient {
    request(url: string, options?: RequestInit): Promise<any>;
    extractData(res: Response): any;
}

class HttpClient implements IHttpClient {
    async request(url: string, options = {}): Promise<any> {
        try {
            const res = await http("http://192.168.1.41:3000/" + url, options);
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
export { httpClient }