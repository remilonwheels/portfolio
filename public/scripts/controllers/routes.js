'use strict';

page('/', () => $('body').animate( { scrollTop: $('#section-home').offset().top }, 500));
page('/me', () => $('body').animate( { scrollTop: $('#section-code').offset().top }, 500));
page('/work', () => $('body').animate( { scrollTop: $('#section-portfolio').offset().top }, 500));
page('/contact', () => $('body').animate( { scrollTop: $('#section-contact').offset().top }, 500));

page();
