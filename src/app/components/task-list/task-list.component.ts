import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, TaskItem } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskModalComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  showAddModal = false;

  get sortedPendingTasks(): TaskItem[] {
    return this.tasks
      .filter((task) => !task.isCompleted)
      .sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: (error) => console.error('Error loading tasks:', error),
    });
  }

  onTaskAdded(task: TaskItem): void {
    this.tasks = [...this.tasks, task];
    this.showAddModal = false;
  }

  updateTask(task: Partial<TaskItem>): void {
    if (task.taskId) {
      this.taskService.updateTask(task.taskId, task).subscribe({
        next: () => {
          this.tasks = this.tasks.map((t) =>
            t.taskId === task.taskId ? { ...t, ...task } : t
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
