var app = {};

app.handleNavToggle = function() {
  $('#menu-div').on('click', function() {
    $('nav ul').fadeToggle(500);
    $(this).toggleClass('is-nav-open is-nav-closed');
  });
}

app.handleNavClick = function() {
  $('nav li').on('click', function() {
    $('nav ul').removeClass('show');
  })
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
}

app.handleNavToggle();
app.handleNavClick();
app.populateProjectSelectFilter();
