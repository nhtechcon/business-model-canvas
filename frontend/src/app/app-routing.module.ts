import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageMainComponent } from "./pages/page-main/page-main.component";
import { PageLoginComponent } from "./pages/page-login/page-login.component";

const routes: Routes = [
  {
    path: "login",
    component: PageLoginComponent,
  },
  {
    path: "main",
    component: PageMainComponent,
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "main",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
