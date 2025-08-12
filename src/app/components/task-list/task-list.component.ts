import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskModalComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  showAddModal = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (error) => console.error('Error loading tasks:', error),
    });
  }

  onTaskAdded(task: Task): void {
    this.tasks = [...this.tasks, task];
    this.showAddModal = false;
  }

  updateTask(task: Task): void {
    if (task.taskId) {
      this.taskService.updateTask(task.taskId, task).subscribe({
        next: (updatedTask) => {
          this.tasks = this.tasks.map((t) =>
            t.taskId === updatedTask.taskId ? updatedTask : t
          );
        },
        error: (error) => console.error('Error updating task:', error),
      });
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.taskId !== taskId);
      },
      error: (error) => console.error('Error deleting task:', error),
    });
  }
}
