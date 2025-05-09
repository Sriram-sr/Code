import { ProjectList } from './App/ProjectList.js';

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
    analyticsScript.src = 'assets/scripts/Utility/Analytics.js';
    analyticsScript.defer = true;
    document.head.appendChild(analyticsScript);
  }
}

ProjectApp.init();
