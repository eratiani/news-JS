import { drawNews, drawSources } from "../view/appView";

interface getres {
    endpoint: string;
    options?: object;
}
class Loader {
    baseLink: string;
    options: object;
    constructor(baseLink:string, options:object) {
        this.baseLink = baseLink;
        this.options = options;
    }
    getArticles(
        { endpoint, options = {} }: getres,
        callback = (data: drawNews) => {
            console.error('No callback for GET response', data);
        }
    ) {
        const method = 'GET';
        this.loadnews(method, endpoint, callback, options );
    }
    getResp(
        { endpoint, options = {} }:getres,
        callback = (_data:drawSources):void => {
            console.error('No callback for GET response');
        }
    ):void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res:Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: {[key: string]: string;}, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }
    
    loadnews( method: string, endpoint:string, callback: (data:drawNews) => void, options = {} ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: drawNews) => callback(data))
            .catch((err) => console.error(err));
    }
    load(method: string, endpoint: string, callback:(data:drawSources) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
