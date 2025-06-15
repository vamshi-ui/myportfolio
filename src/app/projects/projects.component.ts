import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Project,
  ProjectCardComponent,
} from './project-card/project-card.component';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: '1',
      title: 'Plant Viewer - Virtual Plant Tour',
      description:
        'An innovative virtual tour solution for exploring industrial plants with features like a rich asset library, interactive 3D visualization, and a progress tracker for digital twin management. Built from scratch using Pannellum, Angular, Node.js, and MySQL.',
      image: 'plantviewer.jpeg',
      technologies: [
        { name: 'Angular', color: 'red' },
        { name: 'Node.js', color: 'green' },
        { name: 'MySQL', color: 'blue' },
        { name: 'Pannellum', color: 'teal' },
        { name: '3d visualization', color: 'purple' },
        { name: 'RBAC', color: 'pink' },
      ],
      projectUrl: '',
      githubUrl: '',
    },
    {
      id: '2',
      title: 'MatOne - Material Control System',
      description:
        'A customized system built from scratch to manage and issue materials for solar module manufacturing. Developed using Angular, .NET, and MySQL, it supports roles like Day Storage Manager and DS Lead, featuring Single Sign-On (SSO) and Role-Based Access Control (RBAC) for secure and efficient operations.',
      image: 'matone.jpeg',
      technologies: [
        { name: 'Angular', color: 'red' },
        { name: '.NET', color: 'purple' },
        { name: 'MySQL', color: 'blue' },
        { name: 'SSO', color: 'indigo' },
        { name: 'RBAC', color: 'pink' },
        { name: 'Micro Frontends', color: 'orange' },
      ],
      projectUrl: '',
      githubUrl: '',
    },
    {
      id: '3',
      title: 'Profitability Report - Dashboard Integration',
      description:
        'A versatile dashboard system for analyzing and visualizing profitability data, designed as a plug-and-play solution using Micro Frontends. Built with Angular, it seamlessly integrates into any application, offering real-time financial insights through a user-friendly interface.',
      image: 'report.jpeg',
      technologies: [
        { name: 'Angular', color: 'red' },
        { name: 'Micro Frontends', color: 'orange' },
        { name: 'Dashboard', color: 'cyan' },
        { name: 'Node.js', color: 'green' },
        { name: 'RBAC', color: 'pink' },
        { name: 'MySQL', color: 'blue' },
      ],
      projectUrl: '',
      githubUrl: '',
    },
    {
      id: '4',
      title: 'Taskboard Pro - Task Management Application',
      description:
        'Built and deployed a full-stack task management app with React, Next.js, Node.js, and MongoDB, hosted on AWS EC2. Features include authentication, task management, SSR/CSR, loading indicators, and toast notifications.',
      image: 'taskboardpro.png',
      technologies: [
        { name: 'React', color: 'blue' },
        { name: 'Next.js', color: 'gray' },
        { name: 'Node.js', color: 'green' },
        { name: 'MongoDB', color: 'green' },
        { name: 'AWS EC2', color: 'orange' },
        { name: 'Tailwind CSS', color: 'cyan' },
        { name: 'React Prime', color: 'blue' },
        { name: 'Full-Stack Development', color: 'purple' },
        { name: 'SSR', color: 'yellow' },
        { name: 'CSR', color: 'yellow' },
      ],
      projectUrl: 'https://taskboardpro.codebyvamshi.in/',
      githubUrl: 'https://github.com/vamshi-ui/taskboardpro-ui',
    },
  ];

  ngOnInit() {}
}
