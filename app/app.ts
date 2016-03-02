import {Component} from 'angular2/core'
import {RouteConfig} from "angular2/router";
import {HomePageComponent} from "./home-page";
import {EventsComponent} from "./events";
import {ContactUsComponent} from "./contact-us";
import {ROUTER_DIRECTIVES} from "angular2/router";


@Component({
    selector: 'app',
    templateUrl: 'views/app.html',
    directives: ROUTER_DIRECTIVES
})
@RouteConfig([
    {path:'/', name:'HomePage', component: HomePageComponent, useAsDefault: true},
    {path:'/events', name:'Events', component: EventsComponent},
    {path:'/contact-us', name:'ContactUs', component: ContactUsComponent}
])
export class App {

}