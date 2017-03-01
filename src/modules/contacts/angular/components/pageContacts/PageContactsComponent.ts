import {IContact} from "../../models/contact";
import {ILocalStorageService} from "../../../core/services/impl/LocalStorageService";
export class PageContactsComponent implements ng.IComponentOptions {
    public bindings: any = {
        name: "<",
        phone: "<",
        group: "<"
    };
    public template: string = `
       <form class="form-inline  card card-block" ng-submit="vm.save(vm)">
          <div class="form-group">
            <label for="inputName" class="bmd-label-floating" >Name</label>
            <input type="text" class="form-control" id="inputName" ng-model="vm.name" name="vm.name">
          </div>
          <div class="form-group">
            <label for="inputPhone" class="bmd-label-floating">Phone</label>
            <input type="tel" class="form-control"  id="inputPhone" ng-model="vm.phone" name="vm.phone">
          </div>
           <span class="form-group">
                <label for="group" class="bmd-label-floating">Group</label>
                <select class="form-control" id="group" ng-model="vm.group">
                  <option>Workers</option>
                  <option>Family</option>
                </select>
            </span>
          <span class="form-group bmd-form-group"> 
            <button type="submit" class="btn btn-primary btn-raised">
                {{!vm.isEditing ? "Add Contact" : "Update Contact" }}
            </button>
          </span>
        </form>
        
        <div ng-show="vm.workersStore.length > 0 || vm.familyStore.length > 0" class="card-deck">
             <div class="card card-block">
                <ul class="list-group">
                    <a class="list-group-item " ng-repeat="contact in vm.workersStore track by $index">
                        <i class="material-icons"  ng-click="vm.edit(contact, $index)">edit</i>
                        <div class="bmd-list-group-col">
                            <p class="list-group-item-heading">Name: {{contact.name}}</p><br>
                            <p class="list-group-item-text">Phone: {{contact.phone}}</p>
                            <p class="list-group-item-text">Group: {{contact.group}}</p>
                        </div>
                        <i class="material-icons" ng-click="vm.remove(contact)">delete</i>
                    </a>  
                </ul>              
            </div>
             <div class="card card-block">
               <ul class="list-group ">
                    <a class="list-group-item" ng-repeat="contact in vm.familyStore track by $index">
                        <i class="material-icons"  ng-click="vm.edit(contact, $index)">edit</i>
                        <div class="bmd-list-group-col">
                            <p class="list-group-item-heading">Name: {{contact.name}}</p><br>
                            <p class="list-group-item-text">Phone: {{contact.phone}}</p>
                            <p class="list-group-item-text">Group: {{contact.group}}</p>
                        </div>
                        <i class="material-icons" ng-click="vm.remove(contact)">delete</i>
                    </a>  
                </ul>
            </div>
        </div>
    `;
    public controller: any = PageContactController;
    public controllerAs: string = "vm";
}

export class PageContactController {
    public familyStore: Array<IContact> = [];
    public workersStore: Array<IContact> = [];
    private currentEditingIndex: number;
    public isEditing: boolean = false;

    public name: string;
    public phone: string;
    public group: string;

    constructor(private localStorageService: ILocalStorageService, private $scope: ng.IScope) {
        this.familyStore = this.localStorageService
            .get<IContact>("Family");

        this.workersStore = this.localStorageService
            .get<IContact>("Workers");
    }

    public save(contact: IContact): void {
        let currentContact: IContact = {name: contact.name, phone: contact.phone, group: contact.group};
        switch (contact.group) {
            case "Family":
                if (!this.isEditing) {
                    this.familyStore.push(currentContact);
                } else {
                    this.familyStore[this.currentEditingIndex] = currentContact;
                }
                this.localStorageService.set<IContact>("Family", ...this.familyStore);
                break;

            case "Workers":
                if (!this.isEditing) {
                    this.workersStore.push(currentContact);
                } else {
                    this.workersStore[this.currentEditingIndex] = currentContact;
                }
                this.localStorageService.set<IContact>("Workers", ...this.workersStore);
                break;
        }
        // clear form
        this.clearForm();
        this.isEditing = false;
    }

    public edit(contact: IContact, index: number) {
        this.isEditing = true;
        this.name = contact.name;
        this.phone = contact.phone;
        this.group = contact.group;
        this.currentEditingIndex = index;
    }

    remove(contact: IContact) {
        switch (contact.group) {
            case "Family":
                this.familyStore.splice(this.familyStore.indexOf(contact), 1);
                this.localStorageService.update<IContact>("Family", ...this.familyStore);
                break;

            case "Workers":
                this.workersStore.splice(this.workersStore.indexOf(contact), 1);
                this.localStorageService.update<IContact>("Workers", ...this.workersStore);
                break;
        }
    }


    private clearForm() {
        this.name = "";
        this.phone = "";
        this.group = "";
    }
}
