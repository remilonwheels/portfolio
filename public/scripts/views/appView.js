'use strict';

(function(module) {

  const appView = {};

  appView.createProjectTemplateObject = project => {
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

  appView.createProjectSections = () => {
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
              .map( project => `<div>${project.titleDescription}</div>`)
              .reduce( ( a, b ) => a.concat(b) , '')
          };
        appView.renderTemplate(projectListBySection, '#project-by-section-template', '#project-by-section');
      });
  }

  appView.populateGithubData = () => {
    let repos = [];

    $.get('/github/user/repos?type=owner')
    .then( data => {
      repos = data;
      $('#repo-total').text(repos.length);
    });
  }

  appView.handleNavToggle = () => {
    let animationTime = 250;

    $('#menu-div').on('click', function() {
      $('nav ul').fadeToggle(animationTime);
      $(this).toggleClass('is-nav-open is-nav-closed');
    });

    $('nav li').on('click', function() {
      $('nav ul').fadeOut(animationTime);
      $('#menu-div').toggleClass('is-nav-open is-nav-closed');
    })
  }

  appView.handleProjectClick = () => {
    $('#project-by-section').on('click', 'section div', function() {
      $('#project-by-section div').removeClass('is-project-selected');
      $(this).toggleClass('is-project-selected');
      appView.projectSlider.goToSlide($('#project-by-section section div').index(this));
    });
  }

  appView.renderTemplate = (item, template, domTarget) => {
    let source = $(template).html();
    let templateRender = Handlebars.compile(source);
    $(domTarget).append(templateRender(item));
  }

  appView.renderCodeChart = () => {
    let codeScoreArray = Project.projectsProcessed.map( project => project.codeScore);
    let scoreLabelNames = Project.projectsProcessed.map( project => `${project.projectSection}: ${project.titleDescription}`);

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

  appView.runProjectSlider = () => {
    return $('#projects').bxSlider( {
      onSlideBefore: (slideElement, oldIndex, newIndex) => {
        $('#project-by-section div').removeClass('is-project-selected');
        $($('#project-by-section section div')[appView.projectSlider.getCurrentSlide()]).toggleClass('is-project-selected');
      },
      onSliderLoad: currentIndex => {
        $('#project-by-section div').removeClass('is-project-selected');
        $($('#project-by-section section div')[appView.projectSlider.getCurrentSlide()]).toggleClass('is-project-selected');
      }
    });
  }

  appView.loadPage = () => {
    Project.projectsProcessed.forEach( project => appView.renderTemplate(appView.createProjectTemplateObject(project), '#project-template', '#projects')); // eslint-disable-line no-use-before-define
    appView.createProjectSections();
    appView.renderCodeChart();
    appView.handleNavToggle();
    appView.handleProjectClick();
    appView.populateGithubData();
    appView.projectSlider = appView.runProjectSlider();
  }

  module.appView = appView;

  $(document).ready( () => {
    Project.fetchAll();
  });
})(window);
