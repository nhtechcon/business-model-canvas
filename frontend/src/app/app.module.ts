import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { CustomTranslateLoader } from "./custom-translate-loader";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PrimeNGComponentsModule } from "./primeng-components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BmcCanvasComponent } from "./components/bmc-canvas/bmc-canvas.component";
import { PageMainComponent } from "./pages/page-main/page-main.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { StoreModule, provideStore } from "@ngrx/store";
import { currentCanvasReducer } from "./store/reducers/current-canvas.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { PageOverviewComponent } from "./pages/page-overview/page-overview.component";
import { LogoComponent } from "./components/logo/logo.component";
import { canvasListReducer } from "./store/reducers/canvas-list.reducer";
import { ApiModule, Configuration } from "./core/services/api-client";
import { PageRegisterComponent } from "./pages/page-register/page-register.component";
import { environment } from "src/environments/environment";
import { EffectsModule, provideEffects } from "@ngrx/effects";
import { CanvasListEffects } from "./store/effects/canvas-list.effect";

@NgModule({
  declarations: [
    AppComponent,
    PageMainComponent,
    PageLoginComponent,
    PageOverviewComponent,
    PageRegisterComponent,
    ToolbarComponent,
    SidebarComponent,
    LogoComponent,
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
      defaultLanguage: "en",
    }),
    PrimeNGComponentsModule,
    FormsModule,
    AppRoutingModule,
    BmcCanvasComponent,
    StoreModule.forRoot({
      canvasList: canvasListReducer,
      currentCanvas: currentCanvasReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ReactiveFormsModule,
    ApiModule.forRoot(
      () => new Configuration({ basePath: environment.apiUrl })
    ),
    EffectsModule.forRoot([CanvasListEffects]),
  ],
  providers: [
    provideStore({
      currentCanvas: currentCanvasReducer,
      canvasList: canvasListReducer,
    }),
    provideEffects([CanvasListEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
