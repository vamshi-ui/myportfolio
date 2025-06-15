import { Component } from '@angular/core';
import { SocialLinksComponent } from "../social-links/social-links.component";

@Component({
  selector: 'app-footer',
  imports: [SocialLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  year = new Date().getFullYear();
}
