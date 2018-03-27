import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { Contact } from "../model/contact";
import 'rxjs/add/operator/map';

const url1:string = 'http://localhost:1234/rest/addressbook/';
const url2:string = 'http://localhost:1234/rest/dataprotector/';

@Injectable()
export class ContactService{
    constructor(private http:Http){

    }

    getAll(): Observable<Array<Contact>>{
        return this.http.get(url1).map(resp=>resp.json().data as Contact[]);
        }

    getOne(id: string): Observable<Contact>{
        return this.http.get(url1+id).map(resp=>resp.json().data as Contact);
    }

    delete(id:string): Observable<any> {
        return this.http.delete(url1+id).map(resp=>resp.json().data);
    }

    update(contact: Contact): Observable<any>{
        return this.http.put(url1 + contact._id,contact).map(resp=>resp.json().data as Contact);
    }

    addNew(contact: Contact): Observable<any> {
        return this.http.post(url1, contact).map(r => r.json());
    }


    getAllDP(): Observable<Array<Contact>>{
        return this.http.get(url1).map(resp=>resp.json().data as Contact[]);
        }

    getOneDP(id: string): Observable<Contact>{
        return this.http.get(url1+id).map(resp=>resp.json().data as Contact);
    }

    deleteDP(id:string): Observable<any> {
        return this.http.delete(url1+id).map(resp=>resp.json().data);
    }

    updateDP(contact: Contact): Observable<any>{
        return this.http.put(url1 + contact._id,contact).map(resp=>resp.json().data as Contact);
    }

    addNewDP(contact: Contact): Observable<any> {
        return this.http.post(url1, contact).map(r => r.json());
    }
}
