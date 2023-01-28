import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '940fb6aada4b44a5aa75019f2af74722', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
