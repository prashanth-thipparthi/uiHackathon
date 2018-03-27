import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProtectorComponent } from './dataprotector.component';

describe('DataProtectorComponent', () => {
  let component: DataProtectorComponent;
  let fixture: ComponentFixture<DataProtectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataProtectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProtectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
