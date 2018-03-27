import "bootstrap-loader";
import { NgModule } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { MyAppComponent } from "./components/my-app.component";
import { AppHeaderComponent } from "./components/app-header.component";
import { AppFooterComponent } from "./components/app-footer.component";
import { ViewContactComponent } from "./components/view-contact.component";
import { TitlePipe } from "./pipes/title.pipe";
import { AgePipe } from "./pipes/age.pipe";
import { ContactListComponent } from "./components/contact-list.component";
import { ContactService } from "./service/contact-service";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { routesConfig } from "./routes-config";
import { EditContactComponent } from "./components/edit-contact.component";
import { AddContactComponent } from "./components/add-contact.component";
import { TrackerService } from "./tracker-service";

@NgModule(
    {
        declarations : [MyAppComponent, 
            AppHeaderComponent, 
            AppFooterComponent, 
            ViewContactComponent, 
            TitlePipe, 
            AgePipe, 
            ContactListComponent,
            EditContactComponent,
            AddContactComponent
        ],
        providers : [TrackerService, ContactService],
        imports : [BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(routesConfig, { useHash : true })],
        bootstrap : [MyAppComponent]
    }
)
class MainModule
{
    constructor(private tracker: TrackerService){
        
        tracker.bindAllEvents('*');
        
    }
}

platformBrowserDynamic().bootstrapModule(MainModule);