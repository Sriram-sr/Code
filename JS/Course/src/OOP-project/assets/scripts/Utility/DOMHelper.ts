export class DOMHelper {
  static moveElement(elementId: string, newDestinationSelector: string) {
    const element = document.getElementById(elementId) as HTMLElement;
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
