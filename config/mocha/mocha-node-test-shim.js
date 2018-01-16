require('core-js/es6');
require('core-js/es7/reflect');

require('zone.js/dist/zone-node');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

const testing = require('@angular/core/testing');
const browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());

const jsdom=  require("jsdom");
const { JSDOM } = jsdom;

const window = (new JSDOM('<!doctype html><html><body></body></html>')).window;
const document = window.document;

global.window = window;
global.document = document;
global.HTMLElement = window.HTMLElement;
global.XMLHttpRequest = window.XMLHttpRequest;
global.Node = window.Node;
global.Event = window.Event;

