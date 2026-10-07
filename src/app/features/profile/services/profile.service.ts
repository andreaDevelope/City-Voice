import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisualIdentityDto } from '../models/visual-identity.dto';
import { environment } from '../../../../environments/environment';
import { UserProfileDto } from '../models/user-profile.dto';
import { CategoryProgress } from '../models/category-progress.model';
import { MissionCategory } from '../enums/mission-category';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly baseUrl = `${environment.apiUrl}/profile`;
  private readonly badgeUrl = `${environment.apiUrl}/badge`;

  private http = inject(HttpClient);

  updateVisualIdentity(data: VisualIdentityDto) {
    return this.http.put<VisualIdentityDto>(`${this.baseUrl}/visual-identity`, data);
  }

  getMyProfile() {
    return this.http.get<UserProfileDto>(`${this.baseUrl}/me`);
  }

  getMyBadgeProgress() {
    return this.http.get<CategoryProgress[]>(`${this.badgeUrl}/progress`).pipe(
      map((response) =>
        response.map((item) => {
          if (!Object.values(MissionCategory).includes(item.category as MissionCategory)) {
            throw new Error(`Categoria sconosciuta ricevuta dal backend: ${item.category}`);
          }
          return item;
        }),
      ),
    );
  }
}
