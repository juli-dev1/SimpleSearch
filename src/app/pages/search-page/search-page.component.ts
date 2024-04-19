import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { Observable, tap, Subject, Subscription, catchError } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ArticleService } from '../../services/article-service/article.service';
import { ArticleComponent } from './components/article/article.component';
import { IArticle } from '../../shared/interfaces/article';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, ArticleComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit {
  public articles: IArticle[] = [];
  public filteredArticles: IArticle[] = [];
  public searchTerm: string = '';
  public isDataLoaded: boolean = false;

  private modelChanged: Subject<string> = new Subject<string>();
  private searchSubscription: Subscription = new Subscription();
  private debounceTime: number = 750;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {

    this.fetchArticles();
    
    this.searchSubscription = this.modelChanged
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(() => this.isDataLoaded = true),
        switchMap(val => {
          return this.searchArticles(val);
        }),
        catchError(error => {
          alert(error.message);
          return [];
        })
      )
      .subscribe();
  }

  fetchArticles(): void {
    this.articleService.getArticles()
    .pipe(
      tap(() => this.isDataLoaded = true),
      catchError(error => {
        alert(error.message);
        return [];
      })
    )
    .subscribe({
      next: (response) => {
        this.articles = this.filteredArticles = response; 
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }

  searchArticles(term: string): Observable<IArticle[]> {
    return new Observable<IArticle[]>(observer => {
      if (!term.trim()) {
        this.filteredArticles = this.articles;
      } else {
        this.filteredArticles = this.articles.filter(article =>
          article.title.toLowerCase().includes(term.toLowerCase()) ||
          article.author.toLowerCase().includes(term.toLowerCase()) ||
          article.description.toLowerCase().includes(term.toLowerCase()) ||
          article.content.toLowerCase().includes(term.toLowerCase())
        );
      }
      observer.next(this.filteredArticles);
    });
  
  }

  inputChanged(): void {
    this.modelChanged.next(this.searchTerm);
    this.isDataLoaded = false;
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

}
