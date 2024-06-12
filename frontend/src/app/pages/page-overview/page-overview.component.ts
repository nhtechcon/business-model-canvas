import { Component } from "@angular/core";
import { BmcCanvas } from "src/app/core/models/bmc-canvas.model";

@Component({
  selector: "app-page-overview",
  templateUrl: "./page-overview.component.html",
  styleUrls: ["./page-overview.component.scss"],
})
export class PageOverviewComponent {
  canvasList: BmcCanvas[] = [
    {
      creationDate: new Date(),
      entries: [],
      lastEditDate: new Date(),
      name: "Sample Canvas",
    },
  ];
}
