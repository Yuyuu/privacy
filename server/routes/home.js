'use strict';

exports.index = function (req, res) {
  res.render('index', {
    clazz: 'home'
  });
};
