import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweettileComponent } from './tweettile.component';

describe('TweettileComponent', () => {
  let component: TweettileComponent;
  let fixture: ComponentFixture<TweettileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweettileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweettileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
