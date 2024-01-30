import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HomeFooterComponent } from '../home-footer/home-footer.component';
import { BookDetailDataComponent } from './book-detail-data/book-detail-data.component';
import { HttpClientModule } from '@angular/common/http';
import { BookServices } from '../../services/bookServices';
import { Book } from '../../services/interfaces/book';
import { HomeHeaderComponent } from '../home-header/home-header.component';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeFooterComponent, BookDetailDataComponent, HttpClientModule, HomeHeaderComponent],
  providers: [BookServices],
  templateUrl: './book-detail.component.html',
  // styleUrl: '/src/app/home/home.component.scss'
  styleUrls: ['../home.component.scss', '/src/app/home/home.component.scss']
})
export class BookDetailComponent  {

}
