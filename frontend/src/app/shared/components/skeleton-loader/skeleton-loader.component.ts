import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'animate-pulse ' + containerClass">
      <div 
        *ngFor="let item of [].constructor(count)" 
        [class]="skeletonClass"
      ></div>
    </div>
  `,
  styles: []
})
export class SkeletonLoaderComponent {
  @Input() count: number = 1;
  @Input() skeletonClass: string = 'h-4 bg-gray-300 rounded';
  @Input() containerClass: string = '';
}

