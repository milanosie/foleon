import {BehaviorSubject, firstValueFrom} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private tokenSubject = new BehaviorSubject<string>('');
    private http = inject(HttpClient);

    async authenticate(): Promise<void> {
        const formData = new FormData();
        formData.append('grant_type', 'client_credentials');
        formData.append('client_id', environment.Client_ID);
        formData.append('client_secret', environment.Client_Secret);


        try {
            const response = await firstValueFrom(this.http.post<any>(`${environment.apiBaseUrl}/oauth`,formData));

            const token = response.access_token;
            this.tokenSubject.next(token);
            localStorage.setItem('access_token', token); // Store the token if needed
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    }

    getToken(): string {
        return this.tokenSubject.value;
    }

    clearToken(): void {
        this.tokenSubject.next('');
    }
}
