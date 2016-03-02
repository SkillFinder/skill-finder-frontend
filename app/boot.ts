///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser'
import {App} from "./app";
import {ROUTER_PROVIDERS} from "angular2/router";

bootstrap(App,[ROUTER_PROVIDERS]);