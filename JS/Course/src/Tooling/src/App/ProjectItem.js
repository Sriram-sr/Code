// import { Tooltip } from './Tooltip.js';
import { DOMHelper } from '../Utility/DOMHelper.js';
export class ProjectItem {
    id;
    updateProjectsListHandler;
    hasActiveTooltip = false;
    constructor(id, projectType, updateProjectsListFunction) {
        this.id = id;
        this.updateProjectsListHandler = updateProjectsListFunction;
        this.connectMoreInfoButton();
        this.connectSwitchButton(projectType);
        this.connectDrag();
    }
    showMoreInfoHandler() {
        if (this.hasActiveTooltip) {
            return;
        }
        const projectElement = document.getElementById(this.id);
        const tooltipText = projectElement.dataset.extraInfo;
        import('./Tooltip.js')
            .then(module => {
            const tooltip = new module.Tooltip(() => {
                this.hasActiveTooltip = false;
            }, tooltipText, this.id);
            tooltip.attach();
            this.hasActiveTooltip = true;
        })
            .catch(err => {
            console.log('Error while importing Tooltip file ', err);
        });
    }
    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoButton = projectItemElement?.querySelector('button:first-of-type');
        moreInfoButton.addEventListener('click', this.showMoreInfoHandler.bind(this));
    }
    connectSwitchButton(projectType) {
        const projectItemElement = document.getElementById(this.id);
        let switchButton = projectItemElement?.querySelector('button:last-of-type');
        switchButton = DOMHelper.clearEventListeners(switchButton);
        switchButton.textContent = projectType === 'active' ? 'Finish' : 'Activate';
        switchButton?.addEventListener('click', this.updateProjectsListHandler.bind(null, this.id));
    }
    connectDrag() {
        document.getElementById(this.id)?.addEventListener('dragstart', event => {
            const dragEvent = event;
            dragEvent.dataTransfer?.setData('text/plain', this.id);
            dragEvent.dataTransfer.effectAllowed = 'move';
        });
    }
    update(updateProjectListsFunction, projectType) {
        this.updateProjectsListHandler = updateProjectListsFunction;
        this.connectSwitchButton(projectType);
    }
}
