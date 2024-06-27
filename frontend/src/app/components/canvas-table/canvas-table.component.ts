import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { BasicBmcCanvasInfo } from "src/app/core/models/bmc-canvas.model";

@Component({
  selector: "app-canvas-table",
  templateUrl: "./canvas-table.component.html",
  styleUrls: ["./canvas-table.component.scss"],
  providers: [ConfirmationService],
})
export class CanvasTableComponent {
  @Input({ required: true })
  canvasList!: BasicBmcCanvasInfo[];

  @Output()
  deleteCanvas: EventEmitter<string> = new EventEmitter();

  constructor(private confirmationService: ConfirmationService) {}

  confirmDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      closeOnEscape: true,
      target: event.target as EventTarget,
      message: "Are you sure you want to delete the canvas?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteCanvas.emit(id);
      },
      reject: () => {},
    });
  }
}
