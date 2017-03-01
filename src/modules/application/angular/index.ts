import * as angular from "angular";

import {ContactItApplicationComponent} from "./components/contactitApplication/ContactItApplication";
angular.module("app.application", [])
    .component("contactIt", new ContactItApplicationComponent());