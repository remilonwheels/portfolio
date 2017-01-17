'use strict';

(function(module) {

  const app = {};

  app.createProjectTemplateObject = project => {
    let projectTemplateObject = {};
    for (let key in project) {
      if ( key ==='tags' ) {
        projectTemplateObject.tagHTML =
          project.tags[0]
            .reduce( (htmlEl, item) => htmlEl.concat(`<p>${item}</p>`) , '');
        projectTemplateObject.tagCSS =
          project.tags[1]
            .reduce( (htmlEl, item) => htmlEl.concat(`<p>${item}</p>`) , '');
        projectTemplateObject.tagJS =
          project.tags[2]
            .reduce( (htmlEl, item) => htmlEl.concat(`<p>${item}</p>`) , '');
      } else {
        projectTemplateObject[key] = project[key];
      }
    }
    return projectTemplateObject;
  }

  app.createProjectSections = () => {
    Project.projectsProcessed
      .reduce( (array, project) => {
        if ( array.indexOf(project.projectSection) === -1 ) { array.push(project.projectSection) } return array;
      }, [])
      .forEach( section => {
        let projectListBySection =
          {
            projectSection: section,
            projectList:
              Project.projectsProcessed
              .filter( project => project.projectSection === section )
              .map( project => `<div>${project.projectName}</div>`)
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
    $('#project-by-section').on('click', 'section div', function() {
      // $('.project').fadeOut(300);
      // $(`article[data-project="${$(this).text()}"], article[data-section="${$(this).text()}"]`)
      //     .delay(300)
      //     .fadeIn(300);

      $('#project-by-section div').removeClass('is-project-selected');
      $(this).toggleClass('is-project-selected');

      app.projectSlider.goToSlide($('#project-by-section section div').index(this));
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
    let scoreLabelNames = Project.projectsProcessed.map( project => `${project.projectSection}: ${project.titleDescription.slice(0, project.titleDescription.search('Project'))}`);

    Chart.defaults.global.defaultFontColor = 'rgba(255, 255, 255, 1)';

    let ctx = $('#code-score-chart');
    let codeScoreChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: scoreLabelNames,
        datasets: [
          {
            label: 'HTML',
            data: codeScoreArray.map(scoreArray => scoreArray[0]),
            backgroundColor: 'rgba(255, 255, 255, 1)',
            // borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
          },
          {
            label: 'CSS',
            data: codeScoreArray.map(scoreArray => scoreArray[1]),
            backgroundColor: 'rgba(255, 255, 255, .5)',
            // borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
          },
          {
            label: 'JS',
            data: codeScoreArray.map(scoreArray => scoreArray[2]),
            backgroundColor: 'rgba(15, 60, 150, 0.8)',
            // borderColor: 'rgba(255, 255, 255, 1)',
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
            // stacked: true
          }],
          xAxes: [{
            // stacked: true
          }]
        }
      }
    });
  }

  app.runProjectSlider = () => {
    return $('#projects').bxSlider( {
      onSlideBefore: (slideElement, oldIndex, newIndex) => {
        $('#project-by-section div').removeClass('is-project-selected');
        $($('#project-by-section section div')[app.projectSlider.getCurrentSlide()]).toggleClass('is-project-selected');
      },
      onSliderLoad: currentIndex => {
        $('#project-by-section div').removeClass('is-project-selected');
        $($('#project-by-section section div')[app.projectSlider.getCurrentSlide()]).toggleClass('is-project-selected');
      }
    });
  }

  app.loadPage = () => {
    Project.projectsProcessed.forEach( project => app.renderTemplate(app.createProjectTemplateObject(project), '#project-template', '#projects')); // eslint-disable-line no-use-before-define
    app.createProjectSections();
    app.renderCodeChart();
    app.handleNavToggle();
    app.handleNavClick();
    app.handleProjectClick();
    app.projectSlider = app.runProjectSlider();
  }

  module.app = app;

  $(document).ready( () => {
    // $('body *').css('visibility', 'hidden');
    Project.fetchAll();
    // window.onload = () => {
    //   $('body *').css('visibility', 'initial');
    // }
  });
})(window);
