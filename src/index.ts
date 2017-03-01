import "./modules/application/angular/index";
import "./modules/contacts/angular/index";

import * as angular from "angular";

// load our default (non specific) css
import "./styles/screen.scss";

angular.module("app", ["app.application", "app.contacts"]);
angular.bootstrap(document, ["app"], {
    strictDi: false
});