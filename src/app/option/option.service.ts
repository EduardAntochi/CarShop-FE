import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Option } from "./option";
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environments";


@Injectable({
    providedIn: 'root'
})

export class OptionService {
    private baseURLOptions = environment.backendBaseURL + '/options'

    constructor(private http: HttpClient){}

    getAllOptions(): Observable<Option[]> {
        return this.http.get<Option[]>(`${this.baseURLOptions}/all`);
    }
}