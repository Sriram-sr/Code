export class CoreComponent {
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
