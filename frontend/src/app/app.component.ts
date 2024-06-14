import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { ToastService } from "./core/services/toast.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  protected selectedDate = new Date();

  constructor(
    private primengConfig: PrimeNGConfig,
    private translate: TranslateService,
    private toastService: ToastService,
    private messageService: MessageService
  ) {
    translate.setDefaultLang("en");
    translate.use("en");

    this.toastService.setMessageService(messageService);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.translate
      .get("primeng")
      .subscribe(res => this.primengConfig.setTranslation(res));
  }
}
