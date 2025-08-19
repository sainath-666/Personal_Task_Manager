import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Confirm Delete</h3>
        </div>
        <div class="mt-3 text-gray-600">
          <p>Are you sure you want to delete this task?</p>
        </div>
        <div class="mt-5 flex justify-end space-x-3">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            (click)="onCancel()"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            (click)="onConfirm()"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
})
export class DeleteConfirmModalComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
