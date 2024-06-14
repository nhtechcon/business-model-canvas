import { Injectable } from "@angular/core";
import { Message, MessageService } from "primeng/api";

/**
 * This service wraps the prime-ng message service, so that toasts can be
 * displayed from anywhere, without the dependency of having the primeng
 * MessageService as provider in the respective component.
 */
@Injectable({
  providedIn: "root",
})
export class ToastService {
  private messageService?: MessageService;

  constructor() {}

  public setMessageService(msgService: MessageService) {
    this.messageService = msgService;
  }

  public showToast(msg: Message) {
    this.messageService?.add(msg);
  }
}
