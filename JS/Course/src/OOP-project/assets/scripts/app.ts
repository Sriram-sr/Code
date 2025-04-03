class DOMHelper {
  static moveElement(elementId: string, newDestinationSelector: string) {
    const element = document.getElementById(elementId);
    const destinationElement = document.getElementById(newDestinationSelector);
    destinationElement?.appendChild(element as HTMLElement);
  }

  static clearEventListeners(element: HTMLElement) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
}

class Tooltip {}

class ProjectItem {
  id: string;
  updateProjectsListHandler = (_projectId: string) => {};
  projectType: string;

  constructor(
    id: string,
    updateProjectListsFunction: (_projectId: string) => void,
    projectType: string
  ) {
    this.id = id;
    this.projectType = projectType;
    this.updateProjectsListHandler = updateProjectListsFunction;
    this.connectSwitchButton(this.projectType);
    this.connectMoreInfoButton();
  }

  connectSwitchButton(projectType: string) {
    const projectItemElement = document.getElementById(
      this.id
    ) as HTMLLIElement;
    const switchButton = projectItemElement.querySelector(
      'button:last-of-type'
    ) as HTMLButtonElement;
    DOMHelper.clearEventListeners(switchButton);
    switchButton.textContent = projectType === 'active' ? 'Finish' : 'Activate';
    switchButton?.addEventListener(
      'click',
      this.updateProjectsListHandler.bind(null, this.id)
    );
  }

  connectMoreInfoButton() {}

  update(updateProjectsListsFn: (_projectId: string) => void) {
    this.updateProjectsListHandler = updateProjectsListsFn;
    this.connectSwitchButton(this.projectType);
  }
}

class ProjectList {
  projectType: string;
  projects: Array<ProjectItem> = [];
  switchHandler = (_project: ProjectItem) => {};

  constructor(projecType: 'active' | 'finished') {
    this.projectType = projecType;
    const projectItems = document.querySelectorAll(
      `#${projecType}-projects li`
    ) as NodeListOf<HTMLLIElement>;
    for (const project of projectItems) {
      this.projects.push(
        new ProjectItem(
          project.id,
          this.switchProject.bind(this, project.id),
          this.projectType
        )
      );
    }
  }

  setSwitchHandlerFunction(
    switchHandlerFunction: (project: ProjectItem) => void
  ) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project: ProjectItem) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.projectType}-projects ul`);
    project.update(this.switchProject.bind(this, project.id));
  }

  switchProject(projectId: string) {
    const projectIdx = this.projects.findIndex(
      project => project.id === projectId
    );
    this.projects.splice(projectIdx, 1);
    this.switchHandler(
      this.projects.find(project => project.id === projectId)!
    );
  }
}

class ProjectApp {
  static init() {
    const activeProjects = new ProjectList('active');
    const finishedProjects = new ProjectList('finished');
    activeProjects.setSwitchHandlerFunction(
      finishedProjects.addProject.bind(finishedProjects)
    );
    finishedProjects.setSwitchHandlerFunction(
      activeProjects.addProject.bind(activeProjects)
    );
  }
}

ProjectApp.init();
