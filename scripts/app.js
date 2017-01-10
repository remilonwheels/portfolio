var app = {};

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
  $('#project-by-section').on('click', 'h3', function() {
    console.log(this);
    $('.project').fadeOut(300);
    $(`article[data-project="${$(this).text()}"], article[data-section="${$(this).text()}"]`)
        .delay(300)
        .fadeIn(300);
  });
}

app.renderSectionMe = function() {
}

app.populateProjectSelectFilter = function() {
  projectsRaw.forEach(function(project) {
    var source = $('#select-project-template').html();
    var templateRender = Handlebars.compile(source);
    var newSelect = templateRender(project);
    $('#select-project').append(newSelect);
  });
}

app.createProjectSections = function() {
  var sections = [];
  projectsRaw.forEach(function(project) {
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
    projectsRaw.forEach(function(project) {
      if (project.projectSection === projectListBySection.projectSection) {
        projectListBySection.projectList += `<h3>${project.projectName}</h3>`;
      }
    });
    var source = $('#project-by-section-template').html();
    var templateRender = Handlebars.compile(source);
    var newSection = templateRender(projectListBySection);
    $('#project-by-section').append(newSection);
  });
}

app.loadPage = function() {
  Project.projectsProcessed.forEach(function(project) {
    $('#projects').append(project.toHTML());
  });
  
  app.handleNavToggle();
  app.handleNavClick();
  app.handleProjectClick();
  // app.populateProjectSelectFilter();
  app.createProjectSections();
}
