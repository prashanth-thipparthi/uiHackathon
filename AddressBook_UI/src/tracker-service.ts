import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/add/operator/map"
import { Stat } from "./model/stat";
import { Http } from "@angular/http";

const stat_url: string = "http://localhost:1235/rest/stats/"

@Injectable()
export class TrackerService
{
    private allEvents = ['focus','blur','mouseover','mousedown','mouseup','mousemove', 'click'];

    constructor(private http: Http)
    {

    }

    addStat(stat: Stat): Observable<any>
    {
        return this.http.post(stat_url, stat).map(resp => resp.json());
    }

    masterHandler(): void
    {
        var event = event || window.event;
        let elementId = "";
        for(let i = 0; i < event.path.length; i++)
        {
            if(event.path[i].id)
            {
                elementId = event.path[i].id;
                break;
            }
        }

        if (elementId == "")
            return;

        let classes = event.target.className.replace(/ /g, '#');
        let targetName = event.target.nodeName;
        if (classes)
            targetName += "$" + classes;

        let statObj = new Stat();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        var dateStr = "";
        if(dd<10){
            dateStr ='0'+dd;
        }
        else{
            dateStr = dd.toString();
        }
        var monthStr = "";
        if(mm<10){
            monthStr='0'+mm;
        }
        else{
            monthStr = mm.toString();
        }
        var todayStr = dateStr+'-'+monthStr+'-'+yyyy;
        statObj.date = todayStr;
        statObj.widget = elementId;
        switch(event.type){
            case 'click':
            case 'focus':
                statObj.action = "click";
                this.addStat(statObj).subscribe((data)=>{
                });;
                break;
            case 'mouseover':
            case 'mousedown':
            case 'mouseup':
            case 'mousemove':
                statObj.action = "activesecs";
                this.addStat(statObj).subscribe((data)=>{
                });;
                break;
        }
    }
    
    bindAllEvents(selector): void
    {
        console.log("shankar");
        var elements = document.querySelectorAll(selector);
        for(var i=0;i<elements.length;i++){
            for (var key in this.allEvents){
                elements[i].addEventListener(this.allEvents[key], this.masterHandler.bind(this), false);
            }
        }
    }
}


//bindAllEvents('*', masterHandler);