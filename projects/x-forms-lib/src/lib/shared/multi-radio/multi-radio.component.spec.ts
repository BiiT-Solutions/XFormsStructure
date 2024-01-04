import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRadioComponent } from './multi-radio.component';

describe('MultiRadioComponent', () => {
  let component: MultiRadioComponent;
  let fixture: ComponentFixture<MultiRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiRadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
