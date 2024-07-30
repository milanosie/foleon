import {Component, EventEmitter, NgIterable, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {ButtonDirective} from "primeng/button";

@Component({
    selector: 'foleon-filter',
    standalone: true,
    imports: [CommonModule, FormsModule, DropdownModule, RadioButtonModule, ButtonDirective],
    templateUrl: './filter.component.html'
})
export class FilterComponent {

    @Output() filterChange = new EventEmitter<any>();

    public categories: { label: string, value: string }[] = [
        {label: 'All', value: ''},
        {label: 'Member Magazine', value: 'member_magazine'},
        {label: 'Event Magazine', value: 'event_magazine'},
        {label: 'Brochure', value: 'brochure'},
        {label: 'Manual', value: 'manual'},
        {label: 'Other', value: 'other'},
    ]; // Sample categories

    public filters = {
        category: '',
        status: ''
    };

    /**
     * Emits the filters to the parent component.
     * @returns void
     */
    applyFilters(): void {
        this.filterChange.emit(this.filters);
    }
}
