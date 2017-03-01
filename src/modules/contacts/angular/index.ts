import * as angular from "angular";
import "angular-route";
import {config as routesConfig} from "./configs/routes";
import {PageContactsComponent} from "./components/pageContacts/PageContactsComponent";

// services
import {ILocalStorageService, LocalStorageService} from "../core/services/impl/LocalStorageService";

angular.module("app.contacts", ["ngRoute"])
    .service("localStorageService", LocalStorageService)
    .component("pageContacts", new PageContactsComponent())
    .config(routesConfig);

export {ILocalStorageService};