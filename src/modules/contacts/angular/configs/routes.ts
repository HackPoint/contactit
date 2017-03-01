config.$inject = ["$routeProvider"];
export function config($routeProvider: ng.route.IRouteProvider): void {
    $routeProvider.when("/", {
        template: "<page-contacts></page-contacts>"
    });
}