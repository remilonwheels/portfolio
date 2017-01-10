'use strict';

function Project(opts) {
  for (var key in opts) {
    this[key] = opts[key];
  }
}

Project.prototype.toHTML = function() {
  var source = $('#project-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
}

Project.projectsProcessed = [];

Project.loadAll = function(rawProjectData) {
  rawProjectData.forEach(function(project) {
    Project.projectsProcessed.push(new Project(project));
  });
}

Project.fetchAll = function() {
  if (localStorage.projectData) {
    Project.loadAll(JSON.parse(localStorage.projectData));
    app.loadPage();
  } else {
    $.getJSON('data/projects.json', function(data) {
      localStorage.projectData = JSON.stringify(data);
      Project.loadAll(data);
      app.loadPage();
    });
  }
}
