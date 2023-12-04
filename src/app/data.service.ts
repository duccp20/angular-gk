import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

interface IPlace {
  id: number;
  hinh: string;
  hoanTien: string;
  ten: string;
  soLuongDiaDiem: number;
  diaChi: { bac: string[]; nam: string[]; trung: string[] };
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _url: string = './assets/Data.xml';

  constructor(private _http: HttpClient) {}

  loadData(): Observable<IPlace[]> {
    return this._http
      .get(this._url, { responseType: 'text' })
      .pipe(retry(3), map(this.extractData), catchError(this.handleError));
  }

  private extractData(res: string): IPlace[] {
    const parser = new DOMParser();
    const xml = parser.parseFromString(res, 'application/xml');
    const places = Array.from(xml.getElementsByTagName('place'));
    return places.map((place) => {
      const diaDiemElements = place.getElementsByTagName('address');
      const soLuongDiaDiem = diaDiemElements.length;
      const id = parseInt(
        place.getElementsByTagName('id')[0]?.textContent || '0'
      );

      const diaChi = {
        bac: Array.from(place.querySelectorAll('mien > bac > address')).map(
          (addr) => addr.textContent || ''
        ),
        nam: Array.from(place.querySelectorAll('mien > nam > address')).map(
          (addr) => addr.textContent || ''
        ),
        trung: Array.from(place.querySelectorAll('mien > trung > address')).map(
          (addr) => addr.textContent || ''
        ),
      };

      return {
        id: id,
        hinh: place.getElementsByTagName('hinh')[0]?.textContent || '',
        hoanTien: place.getElementsByTagName('hoanTien')[0]?.textContent || '',
        ten: place.getElementsByTagName('ten')[0]?.textContent || '',
        soLuongDiaDiem: soLuongDiaDiem,
        diaChi: diaChi,
      };
    });
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
