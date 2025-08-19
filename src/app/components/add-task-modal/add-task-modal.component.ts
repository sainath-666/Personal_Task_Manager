import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, TaskItem } from '../../services/task.service';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-modal.component.html',
})
export class AddTaskModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<TaskItem>();

  newTask: Partial<TaskItem> = {
    title: '',
    description: '',
    isCompleted: false,
    dueDate: undefined,
    createdDate: new Date().toISOString(),
  };

  constructor(private taskService: TaskService) {}

  getCurrentDateTime(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }

  onSubmit(): void {
    this.taskService.createTask(this.newTask).subscribe({
      next: (createdTask) => {
        this.taskAdded.emit(createdTask);
      },
      error: (error) => console.error('Error creating task:', error),
    });
  }
}
