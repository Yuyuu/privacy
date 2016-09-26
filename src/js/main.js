import angular from 'angular';
import core from './core';
import utils from './utils';
import http from './http';
import common from './common';
import room from './room';
import error from './error';
import 'jquery';
import '../less/style.less';

angular.module('app', [core, utils, http, common, room, error])
  .run(run);

/* @ngInject */
function run(bootstrapService) {
  bootstrapService.start();
}
