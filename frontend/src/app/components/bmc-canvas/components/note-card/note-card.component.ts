import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDropModule } from "primeng/dragdrop";
import { ButtonModule } from "primeng/button";
import { Note } from "src/app/core/models/note.model";
import { Store } from "@ngrx/store";
import { deleteEntry } from "src/app/store/actions/current-canvas.actions";

@Component({
  selector: "app-note-card",
  standalone: true,
  imports: [CommonModule, DragDropModule, ButtonModule],
  templateUrl: "./note-card.component.html",
  styleUrls: ["./note-card.component.scss"],
})
export class NoteCardComponent {
  @Input()
  note?: Note;

  @Output()
  dragStartHandler: EventEmitter<Note> = new EventEmitter();

  @Output()
  dragEndHandler: EventEmitter<Note> = new EventEmitter();

  @Output()
  protected valueChanged: EventEmitter<string> = new EventEmitter();

  textModel = "";

  constructor(private store: Store) {}

  protected onDeleteClick(event: Event) {
    event.stopImmediatePropagation();
    this.store.dispatch(deleteEntry({ id: this.note!.id }));
  }

  protected onContentChanged($event: any) {
    this.textModel = $event.target.textContent;
    this.valueChanged.emit(this.textModel);
  }
}
