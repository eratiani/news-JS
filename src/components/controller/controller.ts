import { drawNews, drawSources } from '../view/appView';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: ((data:drawSources) => void) | undefined) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: ((data:drawNews) => void) | undefined) {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement | null;

        while (target !== newsContainer) {
            if (target && target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getArticles(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target?.parentNode as HTMLElement;
        }
    }
}

export default AppController;
