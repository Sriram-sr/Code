class Tooltip {}

class ProjectItem {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  connectSwitchButton() {}

  connectMoreInfoButton() {}
}

class ProjectList {
  projects: Array<ProjectItem> = [];

  constructor(projecType: 'active' | 'finished') {
    const projectItems = document.querySelectorAll(
      `#${projecType}-projects li`
    ) as NodeListOf<HTMLLIElement>;
    for (const project of projectItems) {
      this.projects.push(new ProjectItem(project.id));
      console.log(this.projects);
    }
  }
}

class ProjectApp {
  static init() {
    const activeProjects = new ProjectList('active');
    const finishedProjects = new ProjectList('finished');
    console.log('Ignore: ', activeProjects, finishedProjects);
  }
}

ProjectApp.init();
