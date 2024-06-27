import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DragDropModule } from "primeng/dragdrop";
import { ButtonModule } from "primeng/button";
import { Note } from "src/app/core/models/note.model";
import { Store } from "@ngrx/store";
import { deleteEntry } from "src/app/store/actions/current-canvas.actions";
import { Subject, debounceTime, takeUntil } from "rxjs";
import { BaseComponent } from "src/app/components/base.component";

@Component({
  selector: "app-note-card",
  standalone: true,
  imports: [CommonModule, DragDropModule, ButtonModule],
  templateUrl: "./note-card.component.html",
  styleUrls: ["./note-card.component.scss"],
})
export class NoteCardComponent extends BaseComponent implements OnChanges {
  @Input()
  note?: Note;

  @Output()
  dragStartHandler: EventEmitter<Note> = new EventEmitter();

  @Output()
  dragEndHandler: EventEmitter<Note> = new EventEmitter();

  @Output()
  protected valueChanged: EventEmitter<string> = new EventEmitter();

  textModel = "";

  private keyupSubject = new Subject<string>();

  constructor(private store: Store) {
    super();

    this.keyupSubject
      .pipe(debounceTime(300), takeUntil(this.destroy$))
      .subscribe(_ => this.valueChanged.emit(this.textModel));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.textModel = changes["note"].currentValue["text"];
  }

  protected onDeleteClick(event: Event) {
    event.stopImmediatePropagation();
    this.store.dispatch(deleteEntry({ id: this.note!.id }));
  }

  protected onContentChanged($event: any) {
    this.textModel = $event.target.textContent;
    this.keyupSubject.next($event.target.textContent);
  }
}
