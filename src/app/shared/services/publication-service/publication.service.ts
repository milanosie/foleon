import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
// NOTE: The authentication header is being added globally at the core level.
// This is done by providing the AuthInterceptor in core/interceptors and core/services/authentication.service.
export class PublicationService {
    private httpClient: HttpClient = inject(HttpClient);
    private apiUrl = environment.apiBaseUrl + '/v2';

    /**
     * Fetches the projects.
     * @param page
     * @param titleQuery
     * @returns The projects.
     */
    getProjects(page: number, titleQuery: string = '') {

        let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', '10');

        // If there's a titleQuery, add the filter parameter
        if (titleQuery) {
            params = params
                .set('filter[0][field]', 'name')
                .set('filter[0][type]', 'like')
                .set('filter[0][value]', titleQuery);
        }

        return this.httpClient.get<any>(`${this.apiUrl}/magazine/title`, {params});
    }


    /**
     * Fetches the publications of a project.
     * @param projectId
     * @param page
     * @param searchQuery
     * @param filters
     * @returns The publications.
     */
    getPublications(projectId: number, page: number = 1, searchQuery: string = '', filters: any = []) {

        let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', '3')
            .set('filter[0][field]', 'title')
            .set('filter[0][type]', 'eq')
            .set('filter[0][value]', projectId);

        if(searchQuery) {
            params = params
                .set('filter[1][field]', 'name')
                .set('filter[1][type]', 'eq')
                .set('filter[1][value]', searchQuery);
        }

        // NOTE: The following filters are hardcoded for demonstration purposes. This could (should) be dynamic in a real-world application.
        // However, due to time constraints I have decided to do it the easy way since the filters won't change.
        if (filters.category) {
            params = params
                .set('filter[2][field]', 'category')
                .set('filter[2][type]', 'eq')
                .set('filter[2][value]', filters.category);
        }

        if (filters.status) {
            params = params
                .set('filter[3][field]', 'status')
                .set('filter[3][type]', 'eq')
                .set('filter[3][value]', filters.status);
        }


        return this.httpClient.get<any>(`${this.apiUrl}/magazine/edition`, {params});
    }
}
