import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { TaskItem } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule, EditTaskModalComponent],
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input({ required: true }) task!: TaskItem;
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskUpdated = new EventEmitter<Partial<TaskItem>>();

  toggleComplete(): void {
    const updatedTask: Partial<TaskItem> = {
      taskId: this.task.taskId,
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

  onTaskUpdated(updatedTask: Partial<TaskItem>): void {
    this.taskUpdated.emit(updatedTask);
    this.showEditModal = false;
  }
}
