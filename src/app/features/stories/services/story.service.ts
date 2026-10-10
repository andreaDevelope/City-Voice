import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CreateStoryRequest, StoryResponse } from '../models/story-submission';
import { CategoryCount, PageResponse, StoryCardItem } from '../models/story-feed';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private readonly storiesUrl = `${environment.apiUrl}/stories`;
  private readonly publicStoriesUrl = `${environment.apiUrl}/public/stories`;

  private http = inject(HttpClient);

  create(request: CreateStoryRequest) {
    return this.http.post<StoryResponse>(this.storiesUrl, request);
  }

  getFeed(params: { q?: string; category?: string; page?: number; size?: number }) {
    let httpParams = new HttpParams();
    if (params.q) httpParams = httpParams.set('q', params.q);
    if (params.category) httpParams = httpParams.set('category', params.category);
    if (params.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params.size !== undefined) httpParams = httpParams.set('size', params.size);
    return this.http.get<PageResponse<StoryCardItem>>(this.publicStoriesUrl, { params: httpParams });
  }

  getCategoryCounts() {
    return this.http.get<CategoryCount[]>(`${this.publicStoriesUrl}/categories`);
  }
}
