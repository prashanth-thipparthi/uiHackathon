import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsComponent } from '../applications.component';
import { SharedModule } from '../../shared/shared.module';

import { Contact } from '../../model/contact';
import { ContactService } from '../../service/contact-service';

@Component({
  selector: 'app-dataprotector',
  templateUrl: './dataprotector.component.html',
  styleUrls: ['./dataprotector.component.less']
})

export class DataProtectorComponent implements OnInit{
    contacts: Array<Contact> = [];

    constructor(private service: ContactService){

    }

    ngOnInit():void{      
        this.service.getAllDP().subscribe(data=>this.contacts=data);
    }
}
