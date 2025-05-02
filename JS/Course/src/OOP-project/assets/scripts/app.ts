class DOMHelper {
  static moveElement(elementId: string, newDestinationSelector: string) {
    const element = document.getElementById(elementId) as HTMLElement;
    console.log(element.getBoundingClientRect());
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement?.appendChild(element);
    element.scrollIntoView({ behavior: 'smooth' });
  }

  static clearEventListeners(element: HTMLElement) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);

    return clonedElement;
  }
}

class CoreComponent {
  element: HTMLDivElement | null = null;
  hostElement: HTMLElement;
  insertBefore: boolean;

  constructor(hostElementId?: string, inserBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId) as HTMLElement;
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = inserBefore;
  }

  detach() {
    if (this.element) {
      this.element?.remove();
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element!
    );
  }
}

class Tooltip extends CoreComponent {
  closeNotifier: VoidFunction;
  text: string;

  constructor(
    closeNotifierFunction: VoidFunction,
    text: string,
    hostElementId: string
  ) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip() {
    this.detach();
    this.closeNotifier();
  }

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    // Working with template tag
    const tooltipTemplate = document.getElementById(
      'tooltip'
    ) as HTMLTemplateElement;
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p')!.textContent = this.text;
    tooltipElement.appendChild(tooltipBody);

    const hostElementPosLeft = this.hostElement.offsetLeft;
    const hostElementPosTop = this.hostElement.offsetTop;
    const hostElementHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement?.scrollTop;

    const x = hostElementPosLeft + 20;
    const y =
      hostElementPosTop + hostElementHeight - parentElementScrolling! - 10;
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px';
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip.bind(this));
    this.element = tooltipElement;
  }
}

class ProjectItem {
  id: string;
  updateProjectsListHandler: (projectId: string) => void;
  hasActiveTooltip = false;

  constructor(
    id: string,
    projectType: string,
    updateProjectsListFunction: (projectId: string) => void
  ) {
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
    const projectElement = document.getElementById(this.id) as HTMLLIElement;
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText!,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(
      this.id
    ) as HTMLLIElement;
    const moreInfoButton = projectItemElement?.querySelector(
      'button:first-of-type'
    ) as HTMLButtonElement;
    moreInfoButton.addEventListener(
      'click',
      this.showMoreInfoHandler.bind(this)
    );
  }

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

  connectDrag() {
    document.getElementById(this.id)?.addEventListener('dragstart', event => {
      const dragEvent = event as DragEvent;
      dragEvent.dataTransfer?.setData('text/plain', this.id);
      dragEvent.dataTransfer!.effectAllowed = 'move';
    });
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
    /**
    setTimeout(this.startAnalytics, 3000);
    const intervalId = setInterval(() => {
      console.log('Sending analytics data...');
    }, 2000);
    document
      .getElementById('stop-analytics-btn')
      ?.addEventListener('click', clearInterval.bind(null, intervalId));
     */
  }

  static startAnalytics() {
    // Dynamic script import
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/analytics.js';
    analyticsScript.defer = true;
    document.head.appendChild(analyticsScript);
  }
}

ProjectApp.init();
