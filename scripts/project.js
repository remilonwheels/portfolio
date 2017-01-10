'use strict';
var projectsRaw = [];

//constructor
// function Project(projectName, projectSection, dateBegin, dateEnd, projectIMG, titleDescription, description, ghRepoName, siteLink, tags) {
//   this.projectName = projectName;
//   this.projectSection = projectSection;
//   this.dateBegin = dateBegin;
//   this.dateEnd = dateEnd;
//   this.projectIMG = projectIMG;
//   this.titleDescription = titleDescription;
//   this.description = description;
//   this.ghRepoName = ghRepoName;
//   this.siteLink = siteLink;
//   this.tags = tags;
//
//   projectsRaw.push(this);
// }

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

//instances
// new Project('About Me', '201', '12-19-16', '12-23-16', 'assets/raw/about-me.png', 'Week 1 Project', 'Lorem ipsum dolor sit amet', 'about-me', 'remilonwheels.github.io/about-me', ['html', 'css', 'javascript']);
// new Project('Salmon Cookies', '201', '12-19-16', '12-23-16', 'assets/raw/cookie-stand.png', 'Week 2 Project', 'Lorem ipsum dolor sit amet', 'cookie-stand', 'remilonwheels.github.io/cookie-stand', ['html', 'css', 'javascript']);
// new Project('Bus Mall', '201', '12-19-16', '12-23-16', 'assets/raw/bus-mall.png', 'Week 3 Project', 'Lorem ipsum dolor sit amet', 'bus-mall', 'remilonwheels.github.io/bus-mall', ['html', 'css', 'javascript']);
// new Project('Find Sam', '201', '12-19-16', '12-23-16', 'assets/raw/find-sam.png', 'Week 4 Group Project', 'Lorem ipsum dolor sit amet', 'bus-mall', 'remilonwheels.github.io/bus-mall', ['html', 'css', 'javascript']);

Project.projectsProcessed = [];

Project.loadAll = function(rawProjectData) {
  console.log(rawProjectData);
  rawProjectData.forEach(function(project) {
    Project.projectsProcessed.push(new Project(project));
  });
}

Project.fetchAll = function() {
  if (localStorage.projectData) {
    Project.loadAll(localStorage.projectData);
    app.loadPage();
  } else {
    $.getJSON('data/projects.json', function(data) {
      localStorage.projectData = JSON.stringify(data);
      Project.loadAll(data);
      app.loadPage();
    });
  }
}


//function calls
// projectsRaw.forEach(function(project) {
//   $('#projects').append(project.toHTML());
// });
