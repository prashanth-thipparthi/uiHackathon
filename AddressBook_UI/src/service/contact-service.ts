import { Injectable } from "@angular/core";
import { Http } from "@angular/http"
import { Observable } from "rxjs";
import { Contact } from "../model/contact";
import "rxjs/add/operator/map"
import { Stat } from "../model/stat";

const url: string = "http://localhost:1234/rest/contacts/"
const stat_url: string = "http://localhost:1235/rest/stats/"

@Injectable()
export class ContactService
{
    constructor(public http: Http)
    {

    }

    getAll(): Observable<Array<Contact>>
    {
        return this.http.get(url).map(resp => resp.json().data as Contact[]);

    }

    getByName(name: string): Observable<Array<Contact>>
    {
        let tempUrl = url + "?name=" + name;
        return this.http.get(tempUrl).map(resp => resp.json().data as Contact[]);

    }

    getOne(id: string): Observable<Contact>
    {
        return this.http.get(url + id).map(resp => resp.json().data as Contact);
    } 

    delete(id: string): Observable<any>
    {
        return this.http.delete(url + id).map(resp => resp.json().data);
    }
    
    update(contact: Contact): Observable<any>
    {
        return this.http.put(url + contact._id, contact).map(resp => resp.json());
    }

    add(contact: Contact): Observable<any>
    {
        return this.http.post(url, contact).map(resp => resp.json());
    }

    addStat(stat: Stat): Observable<any>
    {
        return this.http.post(stat_url, stat).map(resp => resp.json());
    }
}