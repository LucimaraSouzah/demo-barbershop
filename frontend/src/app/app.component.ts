import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // O ThemeService já inicializa o tema no construtor
    // Mas garantimos que está aplicado
    this.themeService.getCurrentTheme();
  }
}
