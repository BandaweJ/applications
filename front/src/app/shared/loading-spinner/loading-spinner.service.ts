import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingSpinnerService {
  private loadingSubject$ = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject$.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of();
  }

  loadingOn() {
    this.loadingSubject$.next(true);
  }

  loadingOff() {
    this.loadingSubject$.next(false);
  }
}
