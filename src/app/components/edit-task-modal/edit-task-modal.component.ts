import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, TaskItem } from '../../services/task.service';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task-modal.component.html',
})
export class EditTaskModalComponent {
  @Input({ required: true }) task!: TaskItem;
  @Output() closeModal = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<Partial<TaskItem>>();

  editedTask: TaskItem;

  constructor(private taskService: TaskService) {
    this.editedTask = {
      taskId: 0,
      title: '',
      description: '',
      isCompleted: false,
      createdDate: new Date().toISOString(),
    };
  }

  ngOnInit(): void {
    this.editedTask = { ...this.task };
  }

  onSubmit(): void {
    if (this.task.taskId) {
      this.taskService.updateTask(this.task.taskId, this.editedTask).subscribe({
        next: () => {
          this.taskUpdated.emit(this.editedTask);
          this.closeModal.emit();
        },
        error: (error) => console.error('Error updating task:', error),
      });
    }
  }
}
