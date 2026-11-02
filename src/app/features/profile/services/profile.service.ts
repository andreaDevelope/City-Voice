import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisualIdentityDto } from '../models/visual-identity.dto';
import { environment } from '../../../../environments/environment';
import { UserProfileDto } from '../models/user-profile.dto';
import { CategoryProgress } from '../models/category-progress.model';
import { MissionCategory } from '../enums/mission-category';
import { UnlockedBadgeDto } from '../models/unlocked-badge.dto';
import { Observable, map } from 'rxjs';

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
          this.assertMissionCategory(item.category);
          return item;
        }),
      ),
    );
  }

  getUnlockedBadges(): Observable<UnlockedBadgeDto[]> {
    return this.http
      .get<UnlockedBadgeDto[]>(`${this.badgeUrl}/unlocked`)
      .pipe(map((response) => this.validateUnlockedBadges(response)));
  }

  // L'ordine degli id è la posizione in evidenza: il primo va al posto 1.
  setFeaturedBadges(badgeIds: number[]): Observable<UnlockedBadgeDto[]> {
    return this.http
      .put<UnlockedBadgeDto[]>(`${this.badgeUrl}/featured`, { badgeIds })
      .pipe(map((response) => this.validateUnlockedBadges(response)));
  }

  private validateUnlockedBadges(response: UnlockedBadgeDto[]): UnlockedBadgeDto[] {
    return response.map((badge) => {
      this.assertMissionCategory(badge.category);
      return badge;
    });
  }

  private assertMissionCategory(category: string): void {
    if (!Object.values(MissionCategory).includes(category as MissionCategory)) {
      throw new Error(`Categoria sconosciuta ricevuta dal backend: ${category}`);
    }
  }
}
