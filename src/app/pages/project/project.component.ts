import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PublicationService} from "../../shared/services/publication-service/publication.service";
import {debounceTime, distinctUntilChanged, Observable} from "rxjs";
import {DataViewModule, DataViewPageEvent} from "primeng/dataview";
import {TagModule} from "primeng/tag";
import {ReadablePipe} from "../../shared/pipes/readable.pipe";
import {ChipModule} from "primeng/chip";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FilterComponent} from "../../shared/components/filter/filter.component";

@Component({
    selector: 'foleon-project',
    standalone: true,
    imports: [CommonModule, FloatLabelModule, InputTextModule, PaginatorModule, ReactiveFormsModule, DataViewModule, TagModule, ReadablePipe, ChipModule, FilterComponent],
    templateUrl: './project.component.html',
    styles: [' .p-highlight { font-weight: 800;}']
})
export class ProjectComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    private publicationService: PublicationService = inject(PublicationService);
    private fb = inject(FormBuilder);

    public filters: [] = [];
    public projectId: number = inject(ActivatedRoute).snapshot.params['id'];
    public page = 1;
    public searchForm: FormGroup = this.fb.group({
        search: ['']
    });
    public publications$: Observable<any> = new Observable();

    /**
     * Initializes the component with necessary data.
     * @returns void
     */
    ngOnInit() {
        this.publications$ = this.getPublications();

        // Subscribe to search form changes, with a debounceTime of 500 to avoid sending many requests whenever the user types.
        // The method also checks if the value has changed to avoid sending requests with the same value.
        // Finally, the takeUntilDestroyed makes sure that the subscriber is unsubscribed when the component is destroyed.
        this.searchForm.get('search')?.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(500),
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(value => {
            this.publications$ = this.getPublications();
        });
    }

    /**
     * Returns the severity (label color)  of the edition based on its status.
     * @param edition - The edition object.
     * @returns The severity of the edition.
     */
    getSeverity(edition: any): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
        switch (edition.status) {
            case 'published':
                return 'success';
            case 'draft':
                return 'warning';
            case 'archived':
                return 'info';
            default:
                return 'info';
        }
    }

    /**
     * Handles the page change event from the paginator.
     * @param $event
     */
    pageChange($event: DataViewPageEvent): void {
        this.page = this.calculatePage($event.first, 3);
        this.publications$ = this.publicationService.getPublications(this.projectId, this.page, this.searchForm.get('search')?.value);
    }

    /**
     * Calculates the page number based on the index of the first item on that page.
     * This is neccesary because PrimeNG DataView doesn't directly return a page number, but instead the index of the first item on the page.
     *
     * @param index - The index of the first item on the page.
     * @param itemsPerPage - The number of items per page.
     * @returns The page number (1-based).
     */
    calculatePage(index: number, itemsPerPage: number): number {
        // Adding 1 to the result of division ensures that the page number is 1-based.
        return Math.floor(index / itemsPerPage) + 1;
    }

    /**]
     * Fetches the publications from the API.
     * @returns void
     */
    getPublications() {
        return this.publicationService.getPublications(this.projectId, this.page, this.searchForm.get('search')?.value, this.filters);
    }

    /**
     * Handles the filter change event from the filter component.
     * @param $event
     * @returns void
     */
    filterChange($event: any): void {
        this.page = 1;
        this.filters = $event;
        this.publications$ = this.getPublications();
    }
}
