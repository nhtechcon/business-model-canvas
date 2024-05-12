import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

/**
 * A module which imports all required primeng components.
 */
@NgModule({
  imports: [InputTextModule, ButtonModule, CalendarModule],
  exports: [InputTextModule, ButtonModule, CalendarModule],
})
export class PrimeNGComponentsModule {}
