class DOMHelper {
  static moveElement(elementId: string, newDestinationSelector: string) {
    const element = document.getElementById(elementId) as HTMLElement;
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement?.appendChild(element);
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
  updateProjectsListHandler: (projectId: string) => void;

  constructor(
    id: string,
    projectType: string,
    updateProjectsListFunction: (projectId: string) => void
  ) {
    this.id = id;
    this.updateProjectsListHandler = updateProjectsListFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(projectType);
  }

  connectMoreInfoButton() {}

  connectSwitchButton(projectType: string) {
    const projectItemElement = document.getElementById(
      this.id
    ) as HTMLLIElement;
    let switchButton = projectItemElement?.querySelector(
      'button:last-of-type'
    ) as HTMLButtonElement;
    switchButton = DOMHelper.clearEventListeners(
      switchButton
    ) as HTMLButtonElement;
    switchButton.textContent = projectType === 'active' ? 'Finish' : 'Activate';
    switchButton?.addEventListener(
      'click',
      this.updateProjectsListHandler.bind(null, this.id)
    );
  }

  update(
    updateProjectListsFunction: (projectId: string) => void,
    projectType: string
  ) {
    this.updateProjectsListHandler = updateProjectListsFunction;
    this.connectSwitchButton(projectType);
  }
}

class ProjectList {
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
}

class ProjectApp {
  static init() {
    const activeProjects = new ProjectList('active');
    const finishedProjects = new ProjectList('finished');
    activeProjects.setSwitchHandler(
      finishedProjects.addProject.bind(finishedProjects)
    );
    finishedProjects.setSwitchHandler(
      activeProjects.addProject.bind(activeProjects)
    );
  }
}

ProjectApp.init();
