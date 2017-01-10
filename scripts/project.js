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
  if ( localStorage.projectData ) {
    let requestETag = '';
    $.ajax( { url: 'data/projects.json', method: 'HEAD' })
      .then(function(data, msg, xhr) {
        requestETag = xhr.getResponseHeader('ETag');
        if ( requestETag !== JSON.parse(localStorage.projectETag) ) {
          console.log('JSON file has changed');
          $.getJSON('data/projects.json', function(data, msg, xhr) {
            localStorage.projectData = JSON.stringify(data);
            localStorage.projectETag = JSON.stringify(xhr.getResponseHeader('ETag'));
          });
        }
      });
    Project.loadAll(JSON.parse(localStorage.projectData));
    app.loadPage();
  } else {
    $.getJSON('data/projects.json', function(data, msg, xhr) {
      localStorage.projectData = JSON.stringify(data);
      localStorage.projectETag = JSON.stringify(xhr.getResponseHeader('ETag'));
      Project.loadAll(data);
      app.loadPage();
    });
  }
}
