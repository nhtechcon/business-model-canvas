import { Component, Input } from "@angular/core";
import { BasicBmcCanvasInfo } from "src/app/core/models/bmc-canvas.model";

@Component({
  selector: "app-canvas-table",
  templateUrl: "./canvas-table.component.html",
  styleUrls: ["./canvas-table.component.scss"],
})
export class CanvasTableComponent {
  @Input({ required: true })
  canvasList!: BasicBmcCanvasInfo[];
}
