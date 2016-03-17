import {Component} from "angular2/core";
import {PROFILES} from "./mock-profiles";
@Component({
    selector: 'home-page',
    templateUrl: 'views/home-page.html'
})
export class HomePageComponent {
    profiles=PROFILES;
}