import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightEntriesComponent } from './weight-entries.component';

describe('WeightEntriesComponent', () => {
  let component: WeightEntriesComponent;
  let fixture: ComponentFixture<WeightEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
