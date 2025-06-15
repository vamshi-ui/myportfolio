import { Component, OnInit, Renderer2 } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { HeroComponent } from './hero/hero.component';
import { HeaderComponent } from './header/header.component';
import { ChatComponent } from "./chat/chat.component";

@Component({
  selector: 'app-root',
  imports: [
    FooterComponent,
    ContactComponent,
    ProjectsComponent,
    SkillsComponent,
    HeroComponent,
    HeaderComponent,
    ChatComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'portfolio-latest';
  constructor() {}

  ngOnInit(): void {}

}
