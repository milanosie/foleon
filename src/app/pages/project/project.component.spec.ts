import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import {of} from "rxjs";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {DestroyRef} from "@angular/core";
import {PublicationService} from "../../shared/services/publication-service/publication.service";
import {ActivatedRoute} from "@angular/router";

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let publicationServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    publicationServiceMock = {
      getPublications: jest.fn().mockReturnValue(of([]))
    };

    activatedRouteMock = {
      snapshot: {
        params: {
          id: 1
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ProjectComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        DestroyRef,
        { provide: PublicationService, useValue: publicationServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPublications on ngOnInit', () => {
    const getPublicationsSpy = jest.spyOn(component, 'getPublications');
    component.ngOnInit();
    expect(getPublicationsSpy).toHaveBeenCalled();
  });

  it('should return correct severity for edition statuses', () => {
    expect(component.getSeverity({ status: 'published' })).toBe('success');
    expect(component.getSeverity({ status: 'draft' })).toBe('warning');
    expect(component.getSeverity({ status: 'archived' })).toBe('info');
    expect(component.getSeverity({ status: 'unknown' })).toBe('info');
  });

  it('should handle pageChange event correctly', () => {
    const getPublicationsSpy = jest.spyOn(publicationServiceMock, 'getPublications');
    const event = { first: 3 } as any;
    component.pageChange(event);
    expect(component.page).toBe(2);
    expect(getPublicationsSpy).toHaveBeenCalledWith(component.projectId, 2, component.searchForm.get('search')?.value);
  });

  it('should calculate page correctly', () => {
    expect(component.calculatePage(0, 3)).toBe(1);
    expect(component.calculatePage(3, 3)).toBe(2);
    expect(component.calculatePage(6, 3)).toBe(3);
  });

  it('should handle filterChange event correctly', () => {
    const getPublicationsSpy = jest.spyOn(component, 'getPublications');
    const filters = { category: 'test', status: 'published' };
    component.filterChange(filters);
    expect(component.filters).toEqual(filters);
    expect(getPublicationsSpy).toHaveBeenCalled();
  });
});
