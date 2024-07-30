import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FooterComponent} from "./shared/components/footer/footer.component";
import {HeaderComponent} from "./shared/components/header/header.component";
import {AuthenticationService} from "./core/services/authentication.service";

@Component({
    standalone: true,
    imports: [
        RouterModule,
        FooterComponent,
        HeaderComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'milan-foleon';
    initiated = false;

    /**
     * Initializes the app component.
     * @param authService
     */
    constructor(authService: AuthenticationService) {
        authService.authenticate().then(() => {
            this.initiated = true;
        });
    }
}
