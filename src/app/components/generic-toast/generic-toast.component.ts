import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast/toast.service';
import { GenericToastProps } from '../../model/CartProduct';

@Component({
  selector: 'app-generic-toast',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './generic-toast.component.html',
  styleUrl: './generic-toast.component.scss',
})
export class GenericToastComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.toastService.genericToast$.subscribe((value: GenericToastProps) => {
      this.showToast(value);
    });
  }

  showToast(genericToastProps: GenericToastProps) {
    this.messageService.add({
      severity: genericToastProps.severity,
      summary: genericToastProps.summary,
      detail: genericToastProps.detail,
      life: 3000,
    });
  }
}
