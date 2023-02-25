import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsnewsPageComponent } from './friendsnews-page.component';

describe('FriendsnewsPageComponent', () => {
  let component: FriendsnewsPageComponent;
  let fixture: ComponentFixture<FriendsnewsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsnewsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsnewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
