import { Contact } from "../model/contact";
import { Component } from "@angular/core";
import { ContactService } from "../service/contact-service";
import { Router } from "@angular/router";

@Component({
    templateUrl : "./templates/contact-form.html"
})
export class AddContactComponent
{
    contact: Contact = new Contact();
    title: string = "Add new contact";
    btnCaption: string = "Add this contact";


    constructor (private service: ContactService, private router: Router)
    {

    }

    save(): void{
        this.service.add(this.contact).subscribe((data)=>{
            console.log(data);
            if (data["success"])
            {
                this.router.navigate(['/view-contact', data._id]);
            }
            else{
                alert(data["message"]);
            }
        })
    }
}