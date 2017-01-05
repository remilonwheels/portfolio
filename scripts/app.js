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
