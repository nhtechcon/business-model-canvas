import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin, map } from 'rxjs';

/**
 * A custom http translate loader, which loads the normal translations as well
 * as the correct primeng translations. Assumes that the correct files for
 * primeng are put into the assets/i18n dir by the builder.
 */
export class CustomTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private prefix: string = '/assets/i18n',
    private suffix: string = '.json'
  ) {}

  getTranslation(lang: string): Observable<any> {
    // Normal translations
    const i18nContent = this.http.get(`${this.prefix}/${lang}${this.suffix}`);
    // PrimeNG translations
    const primengContent = this.http.get<any>(
      `${this.prefix}/primeng/${lang}${this.suffix}`
    );

    return forkJoin([i18nContent, primengContent]).pipe(
      map(([i18nContent, primengContent]) => {
        // PrimeNG i18n should only have one key. If not, we ignore it.
        if (Object.keys(primengContent).length != 1) {
          return i18nContent;
        }

        primengContent = primengContent[Object.keys(primengContent)[0]];

        return {
          ...i18nContent,
          primeng: {
            ...primengContent,
          },
        };
      })
    );
  }
}
