import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IArticle } from '../../../../shared/interfaces/article';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ShortenPipe } from '../../../../shared/pipes/shorten.pipe';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
  MatTooltipModule,
} from '@angular/material/tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 300,
  hideDelay: 200,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ShortenPipe,
    MatTooltipModule,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  providers: [{provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}],
})
export class ArticleComponent {
  @Input({ required: true }) article!: IArticle;
}
