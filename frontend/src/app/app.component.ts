import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected selectedDate = new Date();

  constructor(
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.translate
      .get('primeng')
      .subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
