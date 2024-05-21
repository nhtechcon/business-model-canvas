import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'primeng/dragdrop';
import { Note } from 'src/app/core/models/note.model';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent {
  @Input()
  note?: Note;

  @Output()
  dragStartHandler: EventEmitter<Note> = new EventEmitter();

  @Output()
  dragEndHandler: EventEmitter<Note> = new EventEmitter();
}
