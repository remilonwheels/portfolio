'use strict';
var projects = [];

//constructor
function Project(projectName, dateBegin, dateEnd, projectIMG, description, tags) {
  this.projectName = projectName;
  this.dateBegin = dateBegin;
  this.dateEnd = dateEnd;
  this.projectIMG = projectIMG;
  this.description = description;
  this.tags = tags;

  projects.push(this);
}

Project.prototype.toHTML = function() {
  // var $newProject = $('article.template').clone();
  // $newProject.find('h3').text(this.projectName);
  // $newProject.find('img').attr('src', this.projectIMG);
  // $newProject.find('p').text(this.description);
  //
  // $newProject.removeClass('template');
  // return $newProject;
  var source = $('project-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
}

//instances
new Project('201', '12-19-16', '12-23-16', 'http://lorempixel.com/400/200', 'Lorem ipsum dolor sit amet', ['html', 'css', 'javascript']);
new Project('301', '01-19-17', '01-23-17', 'http://lorempixel.com/400/200', 'Lorem ipsum dolor sit amet', ['html', 'css', 'javascript', 'jQuery']);
new Project('401', '02-19-17', '02-19-17', 'http://lorempixel.com/400/200', 'Lorem ipsum dolor sit amet', ['html', 'css', 'javascript']);

//function calls
projects.forEach(function(project) {
  $('#projects').append(project.toHTML());
});

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

app.handleNavToggle();
app.handleNavClick();
