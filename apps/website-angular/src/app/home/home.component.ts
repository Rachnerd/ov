import { Component } from '@angular/core';
import { OvPageLayoutComponent } from '@ov/ui-components-angular';
import { OvNavBarComponent } from '@ov/ui-components-angular';
import { OvHeroComponent } from '@ov/ui-components-angular';
import { OvTextComponent } from '@ov/ui-components-angular';
import { OvLinkComponent } from '@ov/ui-components-angular';
import { OvImageCardComponent } from '@ov/ui-components-angular';
import { OvCarouselComponent } from '@ov/ui-components-angular';
import { OvLogoComponent } from '@ov/ui-components-angular';
import { OvButtonComponent } from '@ov/ui-components-angular';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Training', href: '/training' },
  { label: 'Career', href: '/career' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Tech Insights', href: '/tech-insights' },
  { label: 'About', href: '/about' },
];

const OFFICE_CARDS = [
  { label: 'OpenValue Amsterdam', src: '/amsterdam.jpg', href: '#' },
  { label: 'OpenValue Arnhem', src: '/arnhem.jpg', href: '#' },
  { label: 'OpenValue Düsseldorf', src: '/dusseldorf.jpg', href: '#' },
  { label: 'OpenValue Munich', src: '/munich.jpg', href: '#' },
  { label: 'OpenValue Rotterdam', src: '/rotterdam.jpg', href: '#' },
  { label: 'OpenValue Utrecht', src: '/utrecht.jpg', href: '#' },
  { label: 'OpenValue Vienna', src: '/vienna.jpg', href: '#' },
  { label: 'OpenValue Zurich', src: '/zurich.jpg', href: '#' },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    OvPageLayoutComponent,
    OvNavBarComponent,
    OvHeroComponent,
    OvTextComponent,
    OvLinkComponent,
    OvImageCardComponent,
    OvCarouselComponent,
    OvLogoComponent,
    OvButtonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  navItems = NAV_ITEMS;
  officeCards = OFFICE_CARDS;

  scrollToIntro(): void {
    document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
  }
}
