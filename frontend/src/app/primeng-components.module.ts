import { NgModule } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { ToolbarModule } from "primeng/toolbar";
import { InplaceModule } from "primeng/inplace";
import { CardModule } from "primeng/card";
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { PasswordModule } from "primeng/password";

/**
 * A module which imports all required primeng components.
 */
@NgModule({
  imports: [
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ToolbarModule,
    InplaceModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
  ],
  exports: [
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ToolbarModule,
    InplaceModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
  ],
})
export class PrimeNGComponentsModule {}
