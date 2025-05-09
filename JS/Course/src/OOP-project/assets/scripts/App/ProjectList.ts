import { ProjectItem } from './ProjectItem.js';
import { DOMHelper } from '../Utility/DOMHelper.js';

export class ProjectList {
  projects: Array<ProjectItem> = [];
  projectType: string;
  switchHandler = (_project: ProjectItem) => {};

  constructor(projectType: 'active' | 'finished') {
    this.projectType = projectType;
    const projectItems = document.querySelectorAll(
      `#${projectType}-projects li`
    ) as NodeListOf<HTMLLIElement>;
    for (const projectItem of Array.from(projectItems)) {
      this.projects.push(
        new ProjectItem(
          projectItem.id,
          this.projectType,
          this.switchProject.bind(this)
        )
      );
    }
    this.connectDroppable();
  }

  setSwitchHandler(switchHandlerFunction: (_project: ProjectItem) => void) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project: ProjectItem) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.projectType}-projects ul`);
    project.update(this.switchProject.bind(this), this.projectType);
  }

  switchProject(projectId: string) {
    this.switchHandler(
      this.projects.find(project => project.id === projectId)!
    );
    const projectIdx = this.projects.findIndex(
      project => project.id === projectId
    );
    this.projects.splice(projectIdx, 1);
  }

  connectDroppable() {
    const list = document.querySelector(
      `#${this.projectType}-projects ul`
    ) as HTMLUListElement;
    list?.addEventListener('dragenter', event => {
      const dragEvent = event as DragEvent;
      if (dragEvent.dataTransfer?.types[0] === 'text/plain') {
        dragEvent.preventDefault();
        list.parentElement?.classList.add('droppable');
      }
    });
  }
}
