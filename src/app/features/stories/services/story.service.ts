import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CreateStoryRequest, StoryResponse } from '../models/story-submission';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private readonly storiesUrl = `${environment.apiUrl}/stories`;

  private http = inject(HttpClient);

  create(request: CreateStoryRequest) {
    return this.http.post<StoryResponse>(this.storiesUrl, request);
  }
}
