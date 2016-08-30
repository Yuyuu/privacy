import angular from 'angular';
import core from './core';
import http from './http';
import common from './common';
import room from './room';
import 'jquery';
import '../less/style.less';

angular.module('app', [core, http, common, room]);
