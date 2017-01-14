'use strict';

(function(module) {

  const app = {};

  app.createProjectSections = () => {
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

  app.handleNavToggle = () => {
    $('#menu-div').on('click', function() {
      $('nav ul').fadeToggle(500);
      $(this).toggleClass('is-nav-open is-nav-closed');
    });
  }

  app.handleNavClick = () => {
    $('nav li').on('click', function() {
      $('nav ul').fadeOut(500);
      $('#menu-div').toggleClass('is-nav-open is-nav-closed');
    })
  }

  app.handleProjectClick = () => {
    $('#project-by-section').on('click', 'div', function() {
      $('.project').fadeOut(300);
      $(`article[data-project="${$(this).text()}"], article[data-section="${$(this).text()}"]`)
          .delay(300)
          .fadeIn(300);
    });
  }

  app.renderTemplate = (item, template, domTarget) => {
    let source = $(template).html();
    let templateRender = Handlebars.compile(source);
    let newItem = templateRender(item);
    $(domTarget).append(newItem);
  }

  app.renderCodeChart = () => {
    let codeScoreArray = Project.projectsProcessed.map( project => project.codeScore);
    let scoreLabelNames = Project.projectsProcessed.map( project => project.projectName);

    var ctx = $('#code-score-chart');
    var codeScoreChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: scoreLabelNames,
        datasets: [
          {
            label: 'HTML',
            data: codeScoreArray.map(scoreArray => scoreArray[0]),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          },
          {
            label: 'CSS',
            data: codeScoreArray.map(scoreArray => scoreArray[1]),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          },
          {
            label: 'JS',
            data: codeScoreArray.map(scoreArray => scoreArray[2]),
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          }
        ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              },
              stacked: true
            }],
            xAxes: [{
              stacked: true
            }]
          }
        }
    });
  }

  app.loadPage = () => {
    Project.projectsProcessed.forEach( project => app.renderTemplate(project, '#project-template', '#projects'));
    app.createProjectSections();
    app.renderCodeChart();
    app.handleNavToggle();
    app.handleNavClick();
    app.handleProjectClick();
  }


  module.app = app;

  $(document).ready(Project.fetchAll);

})(window);
