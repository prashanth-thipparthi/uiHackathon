import {Component, NgModule, OnInit} from "@angular/core"
import {BrowserModule} from "@angular/platform-browser"
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic"
import "bootstrap-loader"
@Component(
    {
        selector : "my-app",
        template : `
        <h1 class="well">A message from component - {{message}}</h1><author></author>
        <box></box>
        <box></box>
        <box></box>
        `,
        styles : [
            `h1 {
                color : red;
            }`
        ]
    }
)
class HelloWorldComponent
{
    private message: string;

    constructor()
    {
        this.message = "Hello world!";
    }
}

@Component(
    {
        selector : "author",
        template : `<div>
        <p>Name: {{name}}</p>
        <p>Email: {{email}}</p>
        </div>`
    }
)
class AuthorComponent implements OnInit
{
    private name: string;
    private email: string;
    ngOnInit(): void {
        this.name = "Shankar M R";
        this.email = "shankar1318@gmail.com"
    }
}

@Component(
    {
        selector : "box",
        template : `
            <div class = "box"></div>
        `,
        styles : [
            `
                div.box{
                    display : inline-block;
                    width : 150px;
                    height : 150px;
                    border : 3px solid blue;
                }
            `
        ]
    }
)
class BoxComponent
{

}

@NgModule({
    declarations : [BoxComponent],
    exports : [BoxComponent]
})
class WidgetsModule
{

}

@NgModule({
    //components, directives, pipes
    declarations : [HelloWorldComponent, AuthorComponent],
    //injectables(services)
    providers : [],
    //other modules that this depends on
    imports : [BrowserModule, WidgetsModule],
    //one or more components that are used in index.html
    bootstrap : [HelloWorldComponent]
}
)
class MyModule
{
}

platformBrowserDynamic().bootstrapModule(MyModule);