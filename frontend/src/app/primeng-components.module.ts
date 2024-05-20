import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';

/**
 * A module which imports all required primeng components.
 */
@NgModule({
  imports: [InputTextModule, ButtonModule, CalendarModule, ToolbarModule],
  exports: [InputTextModule, ButtonModule, CalendarModule, ToolbarModule],
})
export class PrimeNGComponentsModule {}
