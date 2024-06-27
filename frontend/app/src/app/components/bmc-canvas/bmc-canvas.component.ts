import { Component } from "@angular/core";
import { CanvasAreaComponent } from "./components/canvas-area/canvas-area.component";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { BmcEntity } from "src/app/core/models/bmc-entry.model";
import { Note } from "src/app/core/models/note.model";
import { Store } from "@ngrx/store";
import { updateEntryEntity } from "src/app/store/actions/current-canvas.actions";

@Component({
  selector: "app-bmc-canvas",
  templateUrl: "./bmc-canvas.component.html",
  styleUrls: ["./bmc-canvas.component.scss"],
  standalone: true,
  imports: [CommonModule, TranslateModule, CanvasAreaComponent],
})
export class BmcCanvasComponent {
  protected entities = Object.keys(BmcEntity);

  draggedNote?: Note;

  constructor(private store: Store) {}

  asEntity(key: string): BmcEntity {
    return BmcEntity[key as keyof typeof BmcEntity];
  }

  /**
   * Called when a note is being dragged
   */
  noteDragStart(note: Note) {
    this.draggedNote = note;
  }

  /**
   * Called when a node is dropped on an area.
   */
  noteDropped(entity: BmcEntity) {
    if (!this.draggedNote) return;
    this.store.dispatch(
      updateEntryEntity({ entryId: this.draggedNote.id, entity })
    );
  }

  /**
   * Called when a note is being released without a drop.
   */
  noteDragEnd(note: Note) {
    this.draggedNote = undefined;
  }
}
