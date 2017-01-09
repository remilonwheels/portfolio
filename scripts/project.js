'use strict';
var projectsRaw = [];

//constructor
function Project(projectName, projectSection, dateBegin, dateEnd, projectIMG, titleDescription, description, ghRepoName, siteLink, tags) {
  this.projectName = projectName;
  this.projectSection = projectSection;
  this.dateBegin = dateBegin;
  this.dateEnd = dateEnd;
  this.projectIMG = projectIMG;
  this.titleDescription = titleDescription;
  this.description = description;
  this.ghRepoName = ghRepoName;
  this.siteLink = siteLink;
  this.tags = tags;

  projectsRaw.push(this);
}

Project.prototype.toHTML = function() {
  var source = $('#project-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
}

//instances
new Project('About Me', '201', '12-19-16', '12-23-16', 'http://lorempixel.com/400/200', 'Week 1 Project', 'Lorem ipsum dolor sit amet', 'about-me', 'remilonwheels.github.io/about-me', ['html', 'css', 'javascript']);
new Project('Salmon Cookies', '201', '12-19-16', '12-23-16', 'assets/raw/cookie-stand.png', 'Week 2 Project', 'Lorem ipsum dolor sit amet', 'cookie-stand', 'remilonwheels.github.io/cookie-stand', ['html', 'css', 'javascript']);
new Project('Bus Mall', '201', '12-19-16', '12-23-16', 'http://lorempixel.com/400/200', 'Week 3 Project', 'Lorem ipsum dolor sit amet', 'bus-mall', 'remilonwheels.github.io/bus-mall', ['html', 'css', 'javascript']);
new Project('Find Sam', '201', '12-19-16', '12-23-16', 'http://lorempixel.com/400/200', 'Week 4 Group Project', 'Lorem ipsum dolor sit amet', 'bus-mall', 'remilonwheels.github.io/bus-mall', ['html', 'css', 'javascript']);


//function calls
projectsRaw.forEach(function(project) {
  $('#projects').append(project.toHTML());
});
