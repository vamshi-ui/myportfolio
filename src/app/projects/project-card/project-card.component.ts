import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Technology {
  name: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  projectUrl?: string;
  githubUrl?: string;
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  imports: [CommonModule],
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Input() showHoverEffect: boolean = true;
  
  @Output() projectClicked = new EventEmitter<Project>();
  @Output() githubClicked = new EventEmitter<Project>();

  onViewProject(): void {
    if (this.project.projectUrl) {
      this.projectClicked.emit(this.project);
      window.open(this.project.projectUrl, '_blank');
    }
  }

  onViewGithub(): void {
    if (this.project.githubUrl) {
      this.githubClicked.emit(this.project);
      window.open(this.project.githubUrl, '_blank');
    }
  }

  trackByTech(index: number, tech: Technology): string {
    return tech.name;
  }

  getTechColorClass(color: string): string {
    const colorMap: { [key: string]: string } = {
      'blue': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'green': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'purple': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'red': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'yellow': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'indigo': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'pink': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'gray': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      'orange': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'teal': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    };
    
    return colorMap[color.toLowerCase()] || colorMap['gray'];
  }
}