import './news.css';
export interface NewsSource {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    url: string;
    urlToImage: string;
    source: Sources;
}
interface Sources {
    id: string;
    name: string;
}
class News {
    draw(data:NewsSource[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone  = newsItemTemp.content.cloneNode(true) as HTMLElement ;
            const newsCloneItem = (newsClone as HTMLTemplateElement).querySelector('.news__item');
            const newsCloneAuthor = (newsClone as HTMLTemplateElement).querySelector('.news__meta-author')
            const newsCloneDate = (newsClone as HTMLTemplateElement).querySelector('.news__meta-date')
            const newsCloneTitle = (newsClone as HTMLTemplateElement).querySelector('.news__description-title')
            const newsCloneSource = (newsClone as HTMLTemplateElement).querySelector('.news__description-source')
            const newsCloneContent = (newsClone as HTMLTemplateElement).querySelector('.news__description-content')
            const newsCloneA = (newsClone as HTMLTemplateElement).querySelector('.news__read-more a')
            if (newsCloneItem && newsCloneAuthor && newsCloneDate && newsCloneTitle && newsCloneSource && newsCloneContent && newsCloneA) {
                
           
                if (idx % 2) newsCloneItem.classList.add('alt');
    
                (newsClone.querySelector('.news__meta-photo')as HTMLDivElement).style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
                newsCloneAuthor.textContent = item.author || item.source.name;
                newsCloneDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
    
                newsCloneTitle.textContent = item.title;
                newsCloneSource.textContent = item.source.name;
                newsCloneContent.textContent = item.description;
                newsCloneA.setAttribute('href', item.url);
    
                fragment.append(newsClone);
            }
        });
const newsT = document.querySelector('.news')
if (newsT) {
    
    newsT.innerHTML = '';
    newsT.appendChild(fragment);
}
    }
}

export default News;
