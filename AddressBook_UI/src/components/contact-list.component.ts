import { OnInit, Component } from "@angular/core";
import { Contact } from "../model/contact";
import { ContactService } from "../service/contact-service";
import { TrackerService } from "../tracker-service";
import { Stat } from "../model/stat";

@Component({
    selector : "contact-list",
    templateUrl : "./templates/contact-list.html"
})
export class ContactListComponent implements OnInit
{
    constructor (private service: ContactService, private tracker: TrackerService)
    {

    }
    
    contacts: Array<Contact> = []
    ngOnInit(): void {
        this.service.getAll().subscribe(data => this.contacts = data)
    }

    search(name: string): void{
        this.service.getByName(name).subscribe(data => this.contacts = data)
    }
}