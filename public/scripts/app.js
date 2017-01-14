'use strict';

(function(module) {

  const app = {};

  app.createProjectSections = function() {
    Project.projectsProcessed
      .reduce( (array, project) => {
        if ( array.indexOf(project.projectSection) === -1 ) {array.push(project.projectSection)} return array;
      }, [])
      .forEach(function(section) {
        var projectListBySection =
          {
            projectSection: section,
            projectList:
              Project.projectsProcessed
              .filter( project => project.projectSection === section )
              .map(project => `<div>${project.projectName}</div>`)
              .reduce( ( a, b ) => a.concat(b) , '')
          };

        var source = $('#project-by-section-template').html();
        var templateRender = Handlebars.compile(source);
        var newSection = templateRender(projectListBySection);
        $('#project-by-section').append(newSection);
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
    Project.projectsProcessed.forEach( project => {
      $('#projects').append(project.toHTML());
    });
    app.createProjectSections();
    app.handleNavToggle();
    app.handleNavClick();
    app.handleProjectClick();
  }

  module.app = app;

  $(document).ready(Project.fetchAll);

})(window);
