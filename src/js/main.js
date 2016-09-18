import angular from 'angular';
import core from './core';
import utils from './utils';
import http from './http';
import common from './common';
import room from './room';
import 'jquery';
import '../less/style.less';

angular.module('app', [core, utils, http, common, room]);
