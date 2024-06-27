import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoteCardComponent } from "../../note-card/note-card.component";
import { DragDropModule } from "primeng/dragdrop";
import { Note } from "src/app/core/models/note.model";
import { BmcEntity, BmcEntry } from "src/app/core/models/bmc-entry.model";
import { Store } from "@ngrx/store";
import { selectEntityEntries } from "src/app/store/selectors/current-canvas.selectors";
import { Observable } from "rxjs";
import {
  addEntry,
  updateEntryText,
} from "src/app/store/actions/current-canvas.actions";

@Component({
  selector: "app-canvas-area-content",
  standalone: true,
  imports: [CommonModule, NoteCardComponent, DragDropModule],
  templateUrl: "./canvas-area-content.component.html",
  styleUrls: ["./canvas-area-content.component.scss"],
})
export class CanvasAreaContentComponent implements AfterViewInit {
  private readonly store: Store = inject(Store);

  @Input()
  entityId!: BmcEntity;

  @Output()
  noteDragStart: EventEmitter<Note> = new EventEmitter();

  @Output()
  noteDragEnd: EventEmitter<Note> = new EventEmitter();

  @Output()
  noteDropped: EventEmitter<BmcEntity> = new EventEmitter();

  notes$!: Observable<BmcEntry[]>;

  constructor() {}

  ngAfterViewInit(): void {
    this.notes$ = this.store.select(selectEntityEntries(this.entityId));
  }

  trackNote(_: number, entry: BmcEntry) {
    return entry.id;
  }

  addNote() {
    this.store.dispatch(
      addEntry({
        entry: {
          id: new Date().getTime(),
          date: new Date(),
          lastUpdated: new Date(),
          entity: this.entityId,
          text: "",
        },
      })
    );
  }

  noteValueChanged(id: number, text: string) {
    this.store.dispatch(updateEntryText({ id, text }));
  }
}
