class Tooltip {}

class ProjectItem {
  id: string;
  updateProjectsListHandler = () => {};

  constructor(id: string, updateProjectListsFunction: () => void) {
    this.id = id;
    this.updateProjectsListHandler = updateProjectListsFunction;
    this.connectSwitchButton();
    this.connectMoreInfoButton();
  }

  connectSwitchButton() {
    const projectItemElement = document.getElementById(
      this.id
    ) as HTMLLIElement;
    const switchButton = projectItemElement.querySelector(
      'button:last-of-type'
    );
    console.log(switchButton);
    switchButton?.addEventListener('click', this.updateProjectsListHandler);
  }

  connectMoreInfoButton() {}
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
        new ProjectItem(project.id, this.switchProject.bind(this, project.id))
      );
    }
  }

  setSwitchHandlerFunction(switchHandlerFunction: () => void) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject() {
    this.projects.push();
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
