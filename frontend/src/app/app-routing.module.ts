import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageMainComponent } from "./pages/page-main/page-main.component";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { PageOverviewComponent } from "./pages/page-overview/page-overview.component";
import { PageRegisterComponent } from "./pages/page-register/page-register.component";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
