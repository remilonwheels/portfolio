var app = {};

app.handleNavToggle = function() {
  $('#menu-div').on('click', function() {
    $('nav ul').toggleClass('show');
  })
}

app.handleNavClick = function() {
  $('nav li').on('click', function() {
    $('nav ul').removeClass('show');
  })
}

app.renderSectionMe = function() {
}

app.populateProjectSelectFilter = function() {
  for (var i = 0; i < projectsRaw.length; i++){
    var source = $('#select-project-template').html();
    var templateRender = Handlebars.compile(source);
    var newSelect = templateRender(projectsRaw[i]);
    $('#select-project').append(newSelect);
  }
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
// app.populateProjectSelectFilter();
