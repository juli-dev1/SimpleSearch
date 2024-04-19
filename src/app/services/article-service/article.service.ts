import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticle } from '../../shared/interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  /** JSON - Server runs on PORT 3000 **/
  private apiServerUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getArticles(): Observable<IArticle[]> {
    return this.httpClient
      .get<IArticle[]>(`${this.apiServerUrl}/articles`)
  }

  searchArticle(property: string, term: string): Observable<IArticle[]> {
    return this.httpClient
      .get<IArticle[]>(`${this.apiServerUrl}/articles`, {
        params: {
          [property]: term
        }
      });
  }
}
