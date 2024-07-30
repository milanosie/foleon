import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PublicationService } from './publication.service';
import { environment } from '../../../environments/environment';

describe('PublicationService', () => {
  let service: PublicationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PublicationService]
    });

    service = TestBed.inject(PublicationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getProjects', () => {
    it('should fetch projects with default parameters', () => {
      const page = 1;
      const titleQuery = '';
      const mockResponse = { pageCount: 1, _embedded: { title: [] } };

      service.getProjects(page, titleQuery).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiBaseUrl}/v2/magazine/title?page=1&limit=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch projects with title query', () => {
      const page = 1;
      const titleQuery = 'test';
      const mockResponse = { pageCount: 1, _embedded: { title: [] } };

      service.getProjects(page, titleQuery).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
      const req = httpMock.expectOne(`${environment.apiBaseUrl}/v2/magazine/title?page=1&limit=10&filter%5B0%5D%5Bfield%5D=name&filter%5B0%5D%5Btype%5D=like&filter%5B0%5D%5Bvalue%5D=test`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getPublications', () => {
    it('should fetch publications with default parameters', () => {
      const projectId = 1;
      const page = 1;
      const searchQuery = '';
      const filters = { category: '', status: '' };
      const mockResponse = { pageCount: 1, _embedded: { edition: [] } };

      service.getPublications(projectId, page, searchQuery, filters).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiBaseUrl}/v2/magazine/edition?page=1&limit=3&filter%5B0%5D%5Bfield%5D=title&filter%5B0%5D%5Btype%5D=eq&filter%5B0%5D%5Bvalue%5D=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch publications with search query', () => {
      const projectId = 1;
      const page = 1;
      const searchQuery = 'test';
      const filters = { category: '', status: '' };
      const mockResponse = { pageCount: 1, _embedded: { edition: [] } };

      service.getPublications(projectId, page, searchQuery, filters).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiBaseUrl}/v2/magazine/edition?page=1&limit=3&filter%5B0%5D%5Bfield%5D=title&filter%5B0%5D%5Btype%5D=eq&filter%5B0%5D%5Bvalue%5D=1&filter%5B1%5D%5Bfield%5D=name&filter%5B1%5D%5Btype%5D=eq&filter%5B1%5D%5Bvalue%5D=test`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch publications with category and status filters', () => {
      const projectId = 1;
      const page = 1;
      const searchQuery = '';
      const filters = { category: 'category1', status: 'published' };
      const mockResponse = { pageCount: 1, _embedded: { edition: [] } };

      service.getPublications(projectId, page, searchQuery, filters).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiBaseUrl}/v2/magazine/edition?page=1&limit=3&filter%5B0%5D%5Bfield%5D=title&filter%5B0%5D%5Btype%5D=eq&filter%5B0%5D%5Bvalue%5D=1&filter%5B2%5D%5Bfield%5D=category&filter%5B2%5D%5Btype%5D=eq&filter%5B2%5D%5Bvalue%5D=category1&filter%5B3%5D%5Bfield%5D=status&filter%5B3%5D%5Btype%5D=eq&filter%5B3%5D%5Bvalue%5D=published`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
