import { CoreComponent } from './Component.js';
export class Tooltip extends CoreComponent {
    closeNotifier;
    text;
    constructor(closeNotifierFunction, text, hostElementId) {
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
        const tooltipTemplate = document.getElementById('tooltip');
        const tooltipBody = document.importNode(tooltipTemplate.content, true);
        tooltipBody.querySelector('p').textContent = this.text;
        tooltipElement.appendChild(tooltipBody);
        const hostElementPosLeft = this.hostElement.offsetLeft;
        const hostElementPosTop = this.hostElement.offsetTop;
        const hostElementHeight = this.hostElement.clientHeight;
        const parentElementScrolling = this.hostElement.parentElement?.scrollTop;
        const x = hostElementPosLeft + 20;
        const y = hostElementPosTop + hostElementHeight - parentElementScrolling - 10;
        tooltipElement.style.position = 'absolute';
        tooltipElement.style.left = x + 'px';
        tooltipElement.style.top = y + 'px';
        tooltipElement.addEventListener('click', this.closeTooltip.bind(this));
        this.element = tooltipElement;
    }
}
