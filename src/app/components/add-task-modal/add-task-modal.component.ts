import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-modal.component.html',
})
export class AddTaskModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<Task>();

  newTask: Task = {
    title: '',
    description: '',
    isCompleted: false,
    dueDate: undefined,
  };

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.taskService.createTask(this.newTask).subscribe({
      next: (createdTask) => {
        this.taskAdded.emit(createdTask);
      },
      error: (error) => console.error('Error creating task:', error),
    });
  }
}
