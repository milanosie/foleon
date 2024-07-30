import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicationService} from "../../shared/services/publication-service/publication.service";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {debounceTime, distinctUntilChanged, map, Observable, tap} from "rxjs";
import {PaginatorModule} from "primeng/paginator";
import {OrderListModule} from "primeng/orderlist";
import {RouterLink} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'foleon-landing',
    standalone: true,
    imports: [CommonModule, CardModule, Button, FloatLabelModule, ReactiveFormsModule, InputTextModule, PaginatorModule, OrderListModule, RouterLink],
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {
    protected readonly Math = Math;

    private destroyRef = inject(DestroyRef);
    private publicationService: PublicationService = inject(PublicationService);
    private fb = inject(FormBuilder);

    public projects$: Observable<any> = new Observable();
    public searchForm: FormGroup = this.fb.group({
        search: ['']
    });
    public totalPages = 1;
    public page: number = 1;


    /**
     * Initializes the component with necessary data.
     * @returns void
     */
    ngOnInit(): void {
        this.getProjects();

        // Subscribe to search form changes, with a debounceTime of 500 to avoid sending many requests whenever the user types.
        // The method also checks if the value has changed to avoid sending requests with the same value.
        // Finally, the takeUntilDestroyed makes sure that the subscriber is unsubscribed when the component is destroyed.
        this.searchForm.get('search')?.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(500),
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => {
            this.getProjects();
        });
    }

    /**
     * Fetches the projects from the API.
     * As a side effect, sets the totalPages property and maps the embedded title to the projects.
     * @returns void
     */
    getProjects(): void {
        this.projects$ = this.publicationService.getProjects(this.page, this.searchForm.get('search')?.value)
            .pipe(
                tap((publications) => {
                    this.totalPages = publications.pageCount;
                }),
                map((publications) => publications._embedded.title));
    }
}
