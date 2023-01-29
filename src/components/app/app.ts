import AppController from '../controller/controller';
import { AppView, drawNews, drawSources } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources =  document.querySelector('.sources');
        if (sources) {
            
            sources.addEventListener('click', (e) => this.controller.getNews(e, (data: drawNews) => this.view.drawNews(data)));
            this.controller.getSources((data: drawSources) => this.view.drawSources(data));
        }
    }
}

export default App;
