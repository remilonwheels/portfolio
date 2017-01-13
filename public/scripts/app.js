const app = {};

app.createProjectSections = function() {
  var sections = [];
  Project.projectsProcessed.forEach(function(project) {
    if (sections.indexOf(project.projectSection) === -1) {
      sections.push(project.projectSection);
    }
  });

  sections.forEach(function(section) {
    var projectListBySection = {
      projectSection:'',
      projectList: ''
    };
    projectListBySection.projectSection = section;
    Project.projectsProcessed.forEach(function(project) {
      if (project.projectSection === projectListBySection.projectSection) {
        projectListBySection.projectList += `<div>${project.projectName}</div>`;
      }
    });
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


app.loadPage = function() {
  Project.projectsProcessed.forEach(function(project) {
    $('#projects').append(project.toHTML());
  });
  app.createProjectSections();
  app.handleNavToggle();
  app.handleNavClick();
  app.handleProjectClick();
}

$(document).ready(Project.fetchAll);
