import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageEditorComponent } from "./pages/page-editor/page-editor.component";
import { PageLoginComponent } from "./pages/page-login/page-login.component";
import { PageOverviewComponent } from "./pages/page-overview/page-overview.component";
import { PageRegisterComponent } from "./pages/page-register/page-register.component";
import { isAuthenticatedGuard } from "./core/guards/is-authenticated.guard";

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
        path: "canvas/:id",
        component: PageEditorComponent,
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
