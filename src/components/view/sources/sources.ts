import './sources.css';
export interface ResSources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
class Sources {
    draw(data:Array<ResSources>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp:HTMLElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp && sourceItemTemp instanceof HTMLTemplateElement) {
             
                const sourceClone = sourceItemTemp.content.cloneNode(true);
                const sourseCloneName = (sourceClone as HTMLTemplateElement).querySelector('.source__item-name');
                const sourseCloneNameTwo = (sourceClone as HTMLTemplateElement).querySelector('.source__item')
                if (sourseCloneName && sourseCloneNameTwo) {
                    
                    sourseCloneName.textContent = item.name;
                    sourseCloneNameTwo.setAttribute('data-source-id', item.id);
                }

            fragment.append(sourceClone);
            }
            
        });
        const sources:HTMLElement | null = document.querySelector('.sources');
        if (sources) {
            
            sources.append(fragment);
        }
    }
}

export default Sources;
