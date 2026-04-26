import { Component } from '@angular/core';
import { OvPageLayoutComponent } from '@ov/ui-components-angular/templates/page-layout';
import { OvNavBarComponent } from '@ov/ui-components-angular/organisms/nav-bar';
import { OvHeroComponent } from '@ov/ui-components-angular/organisms/hero';
import { OvTextComponent } from '@ov/ui-components-angular/atoms/text';
import { OvLinkComponent } from '@ov/ui-components-angular/atoms/link';
import { OvImageCardComponent } from '@ov/ui-components-angular/molecules/image-card';
import { OvCarouselComponent } from '@ov/ui-components-angular/organisms/carousel';
import { OvLogoComponent } from '@ov/ui-components-angular/atoms/logo';
import { OvButtonComponent } from '@ov/ui-components-angular/atoms/button';

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
  { label: 'OpenValue Amsterdam', src: '/amsterdam.webp', href: '#' },
  { label: 'OpenValue Arnhem', src: '/arnhem.webp', href: '#' },
  { label: 'OpenValue Düsseldorf', src: '/dusseldorf.webp', href: '#' },
  { label: 'OpenValue Munich', src: '/munich.webp', href: '#' },
  { label: 'OpenValue Rotterdam', src: '/rotterdam.webp', href: '#' },
  { label: 'OpenValue Utrecht', src: '/utrecht.webp', href: '#' },
  { label: 'OpenValue Vienna', src: '/vienna.webp', href: '#' },
  { label: 'OpenValue Zurich', src: '/zurich.webp', href: '#' },
];

@Component({
  selector: 'app-home',
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
