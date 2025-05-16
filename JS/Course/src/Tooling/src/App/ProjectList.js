import { ProjectItem } from './ProjectItem.js';
import { DOMHelper } from '../Utility/DOMHelper.js';
export class ProjectList {
    projects = [];
    projectType;
    switchHandler = (_project) => { };
    constructor(projectType) {
        this.projectType = projectType;
        const projectItems = document.querySelectorAll(`#${projectType}-projects li`);
        for (const projectItem of Array.from(projectItems)) {
            this.projects.push(new ProjectItem(projectItem.id, this.projectType, this.switchProject.bind(this)));
        }
        this.connectDroppable();
    }
    setSwitchHandler(switchHandlerFunction) {
        this.switchHandler = switchHandlerFunction;
    }
    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.projectType}-projects ul`);
        project.update(this.switchProject.bind(this), this.projectType);
    }
    switchProject(projectId) {
        this.switchHandler(this.projects.find(project => project.id === projectId));
        const projectIdx = this.projects.findIndex(project => project.id === projectId);
        this.projects.splice(projectIdx, 1);
    }
    connectDroppable() {
        const list = document.querySelector(`#${this.projectType}-projects ul`);
        list?.addEventListener('dragenter', event => {
            const dragEvent = event;
            if (dragEvent.dataTransfer?.types[0] === 'text/plain') {
                dragEvent.preventDefault();
                list.parentElement?.classList.add('droppable');
            }
        });
    }
}
