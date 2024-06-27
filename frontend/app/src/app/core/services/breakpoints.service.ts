import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum Breakpoint {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge',
}

type Breakpoints = {
  [key in Breakpoint]: string;
};

@Injectable({
  providedIn: 'root',
})
export class BreakpointsService {
  breakpoints: Breakpoints = {
    [Breakpoint.Small]: '(max-width: 599px)',
    [Breakpoint.Medium]: '(min-width: 600px) and (max-width: 959px)',
    [Breakpoint.Large]: '(min-width: 960px) and (max-width: 1279px)',
    [Breakpoint.XLarge]: '(min-width: 1280px)',
  };

  private _breakpointChanges$: Subject<Breakpoint>;

  constructor() {
    this._breakpointChanges$ = new Subject<Breakpoint>();

    this.initBreakpointObserver();
  }

  private initBreakpointObserver(): void {
    // Observe all breakpoints using window.matchMedia
    for (const [key, value] of Object.entries(this.breakpoints)) {
      const mediaQueryList = window.matchMedia(value);

      const listener = (event: MediaQueryListEvent) => {
        if (event.matches) {
          this._breakpointChanges$.next(key as Breakpoint);
        }
      };
      mediaQueryList.addEventListener('change', listener);

      // Emit the initial value
      if (mediaQueryList.matches) {
        this._breakpointChanges$.next(key as Breakpoint);
      }
    }
  }

  // Observable to subscribe for breakpoint changes
  public get breakpointChanges$(): Observable<Breakpoint> {
    return this._breakpointChanges$.asObservable();
  }
}
