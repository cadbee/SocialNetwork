import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfriendsPageComponent } from './addfriends-page.component';

describe('AddfriendsPageComponent', () => {
  let component: AddfriendsPageComponent;
  let fixture: ComponentFixture<AddfriendsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfriendsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
