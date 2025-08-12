import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task-modal.component.html',
})
export class EditTaskModalComponent {
  @Input({ required: true }) task!: Task;
  @Output() closeModal = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<Task>();

  editedTask: Task;

  constructor(private taskService: TaskService) {
    this.editedTask = {
      title: '',
      description: '',
      isCompleted: false,
    };
  }

  ngOnInit(): void {
    this.editedTask = { ...this.task };
  }

  onSubmit(): void {
    if (this.task.taskId) {
      this.taskService.updateTask(this.task.taskId, this.editedTask).subscribe({
        next: (updatedTask) => {
          this.taskUpdated.emit(updatedTask);
          this.closeModal.emit();
        },
        error: (error) => console.error('Error updating task:', error),
      });
    }
  }
}
