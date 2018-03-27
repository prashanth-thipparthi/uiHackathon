import { ContactListComponent } from "./components/contact-list.component";
import { ViewContactComponent } from "./components/view-contact.component";
import { EditContactComponent } from "./components/edit-contact.component";
import { AddContactComponent } from "./components/add-contact.component";

export const routesConfig = [
    {
        path : "",
        redirectTo : "contact-list",
        pathMatch : "full"
    },
    {
        path : "contact-list",
        component : ContactListComponent
    },
    {
        path : "view-contact/:contact_id",
        component : ViewContactComponent
    },
    {
        path : "edit-contact/:contact_id",
        component : EditContactComponent
    },
    {
        path : "add-contact",
        component : AddContactComponent
    }
]