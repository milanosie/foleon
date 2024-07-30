import {Route} from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {ProjectComponent} from "./pages/project/project.component";

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
    },
    {
        path: 'projects',
        component: LandingComponent,
        pathMatch: 'full'
    },
    {
        path: 'projects/:id',
        component: ProjectComponent,
        pathMatch: 'full'
    }
];
