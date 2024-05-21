import { Component } from "@angular/core";
import { CanvasAreaComponent } from "./components/canvas-area/canvas-area.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { BmcEntity } from "src/app/core/models/bmc-entry.model";

@Component({
  selector: "app-bmc-canvas",
  templateUrl: "./bmc-canvas.component.html",
  styleUrls: ["./bmc-canvas.component.scss"],
  standalone: true,
  imports: [CommonModule, TranslateModule, CanvasAreaComponent],
})
export class BmcCanvasComponent {
  protected entities = Object.keys(BmcEntity);

  asEntity(key: string): BmcEntity {
    return BmcEntity[key as keyof typeof BmcEntity];
  }
}
