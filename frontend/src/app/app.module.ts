import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CustomTranslateLoader } from './custom-translate-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNGComponentsModule } from './primeng-components.module';
import { FormsModule } from '@angular/forms';
import { BmcCanvasComponent } from './components/bmc-canvas/bmc-canvas.component';
import { PageMainComponent } from './pages/page-main/page-main.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    PageMainComponent,
    ToolbarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new CustomTranslateLoader(http),
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    PrimeNGComponentsModule,
    FormsModule,
    AppRoutingModule,
    BmcCanvasComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
