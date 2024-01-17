import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeHeaderComponent } from '../home/home-header/home-header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, HomeHeaderComponent, HttpClientModule],
  templateUrl: './shopping-cart.component.html',
  // styleUrl: './shopping-cart.component.scss'
  styleUrls: ['./shopping-cart.component.scss', '../home/home.component.scss']
})
export class ShoppingCartComponent {

}
