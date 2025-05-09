import { Tooltip } from './Tooltip.js';
import { DOMHelper } from '../Utility/DOMHelper.js';

export class ProjectItem {
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
