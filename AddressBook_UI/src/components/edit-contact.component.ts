import { OnInit, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Contact } from "../model/contact";
import { ContactService } from "../service/contact-service";

@Component(
    {
        templateUrl : "/templates/contact-form.html"
    }
)
export class EditContactComponent implements OnInit
{
    contact: Contact = new Contact();
    title: string = "Edit details";
    btnCaption: string = "Update details";

    constructor(private service: ContactService, private activatedRoute: ActivatedRoute, private router: Router)
    {

    }

    ngOnInit(): void{
        this.activatedRoute.params.subscribe(p=>{
            this.service.getOne(p["contact_id"]).subscribe(data => this.contact = data);
        });
    }

    save(): void{
        this.service.update(this.contact)
        .subscribe(()=>{
            this.router.navigate(['/view-contact', this.contact._id]);
        });
    }
}