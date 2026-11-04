import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PublicStats } from '../models/public-stats';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private readonly publicStatsUrl = `${environment.apiUrl}/public/stats`;

  private http = inject(HttpClient);

  getPublicStats(): Observable<PublicStats> {
    return this.http.get<PublicStats>(this.publicStatsUrl);
  }
}
