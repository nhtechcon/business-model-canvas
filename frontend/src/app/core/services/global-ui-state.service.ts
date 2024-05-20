import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalUiStateService {
  private infoTextVisibleSubject = new BehaviorSubject<boolean>(false);
  infoTextVisible$ = this.infoTextVisibleSubject.asObservable();

  toggleInfoTextVisibility() {
    this.infoTextVisibleSubject.next(!this.infoTextVisibleSubject.value);
  }
}
