interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

const validate = (validationInput: Validatable): boolean => {
  const value = validationInput.value;
  let isValid = true;

  if (validationInput.required) {
    isValid = isValid && value.toString().length !== 0;
  }
  if (validationInput.minLength && typeof value === 'string') {
    isValid = isValid && value.toString().length > validationInput.minLength;
  }
  if (validationInput.maxLength && typeof value === 'string') {
    isValid = isValid && value.toString().length < validationInput.maxLength;
  }
  if (validationInput.min) {
    isValid = isValid && +value > validationInput.min;
  }
  if (validationInput.max) {
    isValid = isValid && +value < validationInput.max;
  }
  console.log(`Validated ${value} and validity is ${isValid}`);
  return isValid;
};

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

  private clearUserInputs(): void {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private gatherUserInput(): [string, string, number] | void {
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
      console.log(title, description, people);
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

const firstInstance = new ProjectInput();
