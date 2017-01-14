'use strict';

(function(module) {

  function Project(opts) {
    for (var key in opts) {
      this[key] = opts[key];
    }
  }

  Project.projectsProcessed = [];

  Project.loadAll = rawProjectData =>
    rawProjectData.forEach( project => Project.projectsProcessed.push(new Project(project)));


  Project.fetchAll = () => {
    var load = () => {
      Project.loadAll(JSON.parse(localStorage.projectData));
      app.loadPage();
    }
    var updateData = (data, msg, xhr) => {
      localStorage.projectData = JSON.stringify(data);
      localStorage.projectETag = JSON.stringify(xhr.getResponseHeader('ETag'))
      load();
    }

    if ( localStorage.projectData ) {
      let requestETag = '';
      $.ajax( { url: 'data/projects.json', method: 'HEAD' })
        .then((data, msg, xhr) => {
          requestETag = xhr.getResponseHeader('ETag');
          if ( requestETag !== JSON.parse(localStorage.projectETag) ) {
            console.log('JSON file has changed');
            $.getJSON('data/projects.json', updateData);
          } else {
            load();
          }
        });
    } else {
      $.getJSON('data/projects.json', (data, msg, xhr) => updateData(data, msg, xhr));
    }
  }

  module.Project = Project;

}(window));
