import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE__URL, UPLOAD_IMAGE_URI} from "./api";

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private httpClient: HttpClient) { }

  public uploadImage(imageData: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageData);

    return this.httpClient.post<any>(BASE__URL.concat(UPLOAD_IMAGE_URI), formData);
  }

}
