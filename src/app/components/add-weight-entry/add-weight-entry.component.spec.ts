import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeightEntryComponent } from './add-weight-entry.component';

describe('AddWeightEntryComponent', () => {
  let component: AddWeightEntryComponent;
  let fixture: ComponentFixture<AddWeightEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeightEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeightEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
