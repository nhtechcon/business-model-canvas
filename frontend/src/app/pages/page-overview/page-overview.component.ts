import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { BasicBmcCanvasInfo } from "src/app/core/models/bmc-canvas.model";
import { AuthService } from "src/app/core/services/auth.service";
import { selectAllCanvases } from "src/app/store/selectors/canvas-list.selectors";

@Component({
  selector: "app-page-overview",
  templateUrl: "./page-overview.component.html",
  styleUrls: ["./page-overview.component.scss"],
})
export class PageOverviewComponent {
  canvasList$: Observable<BasicBmcCanvasInfo[]>;

  constructor(
    private store: Store,
    private auth: AuthService,
    private router: Router
  ) {
    this.canvasList$ = this.store.select(selectAllCanvases);
  }

  protected logoutClick() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}
