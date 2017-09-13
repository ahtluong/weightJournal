import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeightEntryComponent } from './edit-weight-entry.component';

describe('EditWeightEntryComponent', () => {
  let component: EditWeightEntryComponent;
  let fixture: ComponentFixture<EditWeightEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWeightEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeightEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
