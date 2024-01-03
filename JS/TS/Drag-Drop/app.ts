enum ProjectStatus {
  Active,
  Finished
}

class Project {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener = (items: Project[]) => void;

// Project State Management

class ProjectState {
  private projects: Project[] = [];
  private listeners: Listener[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listener: Listener) {
    this.listeners.push(listener);
  }

  addProject(title: string, description: string, noOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      noOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

// Global ProjectState Object

const projectState = ProjectState.getInstance();

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

type projectType = 'active' | 'finished';

// Input Validator

const validate = (validationInput: Validatable): boolean => {
  const value = validationInput.value;
  let isValid = true;

  if (validationInput.required) {
    isValid = isValid && value.toString().length !== 0;
  }
  if (validationInput.minLength && typeof value === 'string') {
    isValid = isValid && value.toString().length >= validationInput.minLength;
  }
  if (validationInput.maxLength && typeof value === 'string') {
    isValid = isValid && value.toString().length <= validationInput.maxLength;
  }
  if (validationInput.min) {
    isValid = isValid && +value >= validationInput.min;
  }
  if (validationInput.max) {
    isValid = isValid && +value <= validationInput.max;
  }
  return isValid;
};

// Bind Decorator

function autoBindThis(
  _: any,
  _1: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const oldMethod = descriptor.value;
  return {
    configurable: true,
    enumerable: false,
    get() {
      return oldMethod.bind(this);
    }
  };
}

// Project List

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[] = [];

  constructor(private type: projectType) {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.Active;
        }
        return project.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private attach(this: ProjectList) {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }

  private renderProjects() {
    const listEL = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;
    listEL.innerHTML = '';
    for (const projectItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = projectItem.title;
      listEL.appendChild(listItem);
    }
  }

  private renderContent(this: ProjectList) {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }
}

// Project Input

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private clearUserInputs(this: ProjectInput): void {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private gatherUserInput(this: ProjectInput): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement?.value;
    const enteredPeople = this.peopleInputElement?.value;

    if (
      validate({
        value: enteredTitle,
        minLength: 5,
        maxLength: 15,
        required: true
      }) &&
      validate({
        value: enteredDescription,
        minLength: 5,
        maxLength: 90,
        required: true
      }) &&
      validate({ value: enteredPeople, min: 1, max: 5, required: true })
    ) {
      return [
        this.titleInputElement.value,
        this.descriptionInputElement.value,
        +this.peopleInputElement.value
      ];
    } else {
      alert('Please enter valid inputs!');
    }
  }

  @autoBindThis
  private submitHandler(this: ProjectInput, event: Event) {
    event?.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
    }
    this.clearUserInputs();
  }

  private configure(this: ProjectInput) {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach(this: ProjectInput) {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
