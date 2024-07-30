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

    /**
     * Authenticates the client and stores the token.
     * @returns void
     */
    async authenticate(): Promise<void> {
        const formData = new FormData();
        formData.append('grant_type', 'client_credentials');
        formData.append('client_id', environment.Client_ID);
        formData.append('client_secret', environment.Client_Secret);


        try {
            const response = await firstValueFrom(this.http.post<any>(`${environment.apiBaseUrl}/oauth`,formData));

            const token = response.access_token;
            this.tokenSubject.next(token);
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    }

    /**
     * Returns the current token.
     * @returns string
     */
    getToken(): string {
        return this.tokenSubject.value;
    }
}
