'use strict';

(function(module) {

  const app = {};

  app.createProjectSections = function() {
    Project.projectsProcessed
      .reduce( (array, project) => {
        if ( array.indexOf(project.projectSection) === -1 ) {array.push(project.projectSection)} return array;
      }, [])
      .forEach( section => {
        let projectListBySection =
          {
            projectSection: section,
            projectList:
              Project.projectsProcessed
              .filter( project => project.projectSection === section )
              .map(project => `<div>${project.projectName}</div>`)
              .reduce( ( a, b ) => a.concat(b) , '')
          };

        app.renderTemplate(projectListBySection, '#project-by-section-template', '#project-by-section');
      });
  }

  app.handleNavToggle = function() {
    $('#menu-div').on('click', function() {
      $('nav ul').fadeToggle(500);
      $(this).toggleClass('is-nav-open is-nav-closed');
    });
  }

  app.handleNavClick = function() {
    $('nav li').on('click', function() {
      $('nav ul').fadeOut(500);
      $('#menu-div').toggleClass('is-nav-open is-nav-closed');
    })
  }

  app.handleProjectClick = function () {
    $('#project-by-section').on('click', 'div', function() {
      $('.project').fadeOut(300);
      $(`article[data-project="${$(this).text()}"], article[data-section="${$(this).text()}"]`)
          .delay(300)
          .fadeIn(300);
    });
  }

  app.loadPage = () => {
    Project.projectsProcessed.forEach( project => app.renderTemplate(project, '#project-template', '#projects'));
    app.createProjectSections();
    app.handleNavToggle();
    app.handleNavClick();
    app.handleProjectClick();
  }

  app.renderTemplate = (item, template, domTarget) => {
    let source = $(template).html();
    let templateRender = Handlebars.compile(source);
    let newItem = templateRender(item);
    $(domTarget).append(newItem);
  }

  module.app = app;

  $(document).ready(Project.fetchAll);

})(window);
