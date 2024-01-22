import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user = null;
  @ViewChild("searchForm") searchForm:NgForm;

  submitForm(){
    console.log(this.searchForm.value.search)
  }
}
