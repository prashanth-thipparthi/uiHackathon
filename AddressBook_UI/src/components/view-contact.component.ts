import { OnInit, Component } from "@angular/core";
import {Contact} from "../model/contact"
import { ContactService } from "../service/contact-service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector : "view-contact",
    templateUrl : "./templates/view-contact.html"
})
export class ViewContactComponent implements OnInit
{
    contact: Contact = new Contact;
    
    constructor (private service: ContactService, private activatedRoute: ActivatedRoute, private router: Router)
    {

    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(p=>{
            this.service.getOne(p["contact_id"]).subscribe(data => this.contact = data);
        });
    }

    deleteContact(): void{
        if (confirm("Sure to delete?")){
            this.service.delete(this.contact._id)
            .subscribe(data=>{
                //navigate to contact-list page
                this.router.navigate(['/contact-list'])

            });
        }
    }
    
}