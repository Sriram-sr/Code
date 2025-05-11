export class CoreComponent {
    element = null;
    hostElement;
    insertBefore;
    constructor(hostElementId, inserBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        }
        else {
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
        this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);
    }
}
