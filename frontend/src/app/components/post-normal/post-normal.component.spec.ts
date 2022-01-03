import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNormalComponent } from './post-normal.component';

describe('PostNormalComponent', () => {
  let component: PostNormalComponent;
  let fixture: ComponentFixture<PostNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostNormalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
