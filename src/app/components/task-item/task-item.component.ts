import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule, EditTaskModalComponent],
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskUpdated = new EventEmitter<Task>();

  toggleComplete(): void {
    const updatedTask: Task = {
      ...this.task,
      isCompleted: !this.task.isCompleted,
    };
    this.taskUpdated.emit(updatedTask);
  }

  onDelete(): void {
    if (this.task.taskId) {
      this.taskDeleted.emit(this.task.taskId);
    }
  }

  showEditModal = false;

  onEdit(): void {
    this.showEditModal = true;
  }

  onTaskUpdated(updatedTask: Task): void {
    this.taskUpdated.emit(updatedTask);
    this.showEditModal = false;
  }
}
