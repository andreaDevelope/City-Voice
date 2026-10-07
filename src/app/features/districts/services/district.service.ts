import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MunicipioGroup } from '../models/district.model';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  private readonly districtsUrl = `${environment.apiUrl}/cityvoice/public/districts`;

  private http = inject(HttpClient);

  getGroupedByMunicipio() {
    return this.http.get<MunicipioGroup[]>(this.districtsUrl);
  }
}
