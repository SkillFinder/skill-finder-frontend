///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser'
import {App} from "./app";
import {ROUTER_PROVIDERS} from "angular2/router";
import {LocationStrategy, HashLocationStrategy} from "angular2/router";
import {provide} from "angular2/core";

bootstrap(App,[ROUTER_PROVIDERS,provide(LocationStrategy, {useClass: HashLocationStrategy})]);