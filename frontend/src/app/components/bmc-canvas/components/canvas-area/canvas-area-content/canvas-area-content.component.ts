import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoteCardComponent } from "../../note-card/note-card.component";
import { DragDropModule } from "primeng/dragdrop";
import { Note } from "src/app/core/models/note.model";

@Component({
  selector: "app-canvas-area-content",
  standalone: true,
  imports: [CommonModule, NoteCardComponent, DragDropModule],
  templateUrl: "./canvas-area-content.component.html",
  styleUrls: ["./canvas-area-content.component.scss"],
})
export class CanvasAreaContentComponent {
  @Input()
  entityId!: string;

  notes: Note[] = [
    {
      id: "1",
      text: "note",
      date: new Date(),
    },
  ];

  isDialogVisible = false;

  draggedNote: Note | undefined | null;

  constructor() {}

  addNote() {
    this.isDialogVisible = true;
    this.notes.push({
      id: "",
      text: "new",
      date: new Date(),
    });
  }

  dragStart(note: Note) {
    this.draggedNote = note;
  }

  drop(elm: any) {
    console.log("Dropped on ", this.entityId);
  }

  dragEnd(note: Note) {
    this.draggedNote = null;
  }
}
