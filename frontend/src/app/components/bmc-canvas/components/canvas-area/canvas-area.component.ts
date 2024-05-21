import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";
import { CardModule } from "primeng/card";
import {
  Breakpoint,
  BreakpointsService,
} from "src/app/core/services/breakpoints.service";
import { GlobalUiStateService } from "src/app/core/services/global-ui-state.service";
import { CanvasAreaContentComponent } from "./canvas-area-content/canvas-area-content.component";
import { BmcEntity } from "src/app/core/models/bmc-entry.model";

@Component({
  selector: "app-canvas-area",
  templateUrl: "./canvas-area.component.html",
  styleUrls: ["./canvas-area.component.scss"],
  standalone: true,
  imports: [CommonModule, CardModule, CanvasAreaContentComponent],
})
export class CanvasAreaComponent implements AfterViewInit, OnInit {
  @Input()
  entityId!: BmcEntity;

  @Input()
  name: string = "";

  @Input()
  description: string = "";

  protected isHorizontalLayout = false;
  protected isInfoVisible = false;
  protected breakpoint = Breakpoint.Large;

  constructor(
    private elementRef: ElementRef,
    private uiStateService: GlobalUiStateService,
    private breakpointsService: BreakpointsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.uiStateService.infoTextVisible$.subscribe(visible => {
      this.isInfoVisible = visible;
    });

    this.breakpointsService.breakpointChanges$.subscribe(
      breakpoint => (this.breakpoint = breakpoint)
    );
  }

  ngAfterViewInit() {
    this.updateLayout();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    this.updateLayout();
  }

  private updateLayout() {
    // Ignore layout changes on small screens
    if (this.breakpoint === Breakpoint.Small) {
      return;
    }

    const element = this.elementRef.nativeElement;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    this.isHorizontalLayout = width > height * 1.2;
    this.cdr.detectChanges();
  }
}
