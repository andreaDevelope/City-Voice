import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisualIdentityDto } from '../models/visual-identity.dto';
import { environment } from '../../../../environments/environment';
import { UserProfileDto } from '../models/user-profile.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly baseUrl = `${environment.apiUrl}/profile`;

  private http = inject(HttpClient);

  updateVisualIdentity(data: VisualIdentityDto) {
    return this.http.put<VisualIdentityDto>(`${this.baseUrl}/visual-identity`, data);
  }

  getMyProfile() {
    return this.http.get<UserProfileDto>(`${this.baseUrl}/me`);
  }
}
