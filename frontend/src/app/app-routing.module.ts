import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageMainComponent } from "./pages/page-main/page-main.component";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { PageOverviewComponent } from "./pages/page-overview/page-overview.component";
import { PageRegisterComponent } from "./pages/page-register/page-register.component";
import { isAuthenticatedGuard } from "./core/guards/is-authenticated.guard";
import { canvasResolver } from "./core/resolvers/canvas-data.resolver";

const routes: Routes = [
  {
    path: "login",
    component: PageLoginComponent,
  },
  {
    path: "register",
    component: PageRegisterComponent,
  },
  {
    path: "main",
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: "overview",
        component: PageOverviewComponent,
      },
      {
        path: "canvas",
        component: PageMainComponent,
      },
      {
        path: "canvas/:id",
        component: PageMainComponent,
        resolve: {
          canvasData: canvasResolver,
        },
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "overview",
      },
    ],
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  {
    path: "**",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
