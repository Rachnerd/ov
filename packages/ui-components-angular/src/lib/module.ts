import { NgModule } from '@angular/core';

import { OvButtonComponent } from './atoms/ov-button.js';
import { OvBadgeComponent } from './atoms/ov-badge.js';
import { OvIconComponent } from './atoms/ov-icon.js';
import { OvSpinnerComponent } from './atoms/ov-spinner.js';
import { OvInputComponent } from './atoms/ov-input.js';
import { OvTextareaComponent } from './atoms/ov-textarea.js';
import { OvLabelComponent } from './atoms/ov-label.js';
import { OvLinkComponent } from './atoms/ov-link.js';
import { OvNavLinkComponent } from './atoms/ov-nav-link.js';
import { OvCheckboxComponent } from './atoms/ov-checkbox.js';
import { OvRadioComponent } from './atoms/ov-radio.js';
import { OvSwitchComponent } from './atoms/ov-switch.js';
import { OvHeadingComponent } from './atoms/ov-heading.js';
import { OvTextComponent } from './atoms/ov-text.js';
import { OvAvatarComponent } from './atoms/ov-avatar.js';
import { OvDividerComponent } from './atoms/ov-divider.js';

import { OvFieldComponent } from './molecules/ov-field.js';
import { OvAlertComponent } from './molecules/ov-alert.js';
import { OvCardComponent } from './molecules/ov-card.js';
import { OvImageCardComponent } from './molecules/ov-image-card.js';
import { OvBreadcrumbsComponent } from './molecules/ov-breadcrumbs.js';
import { OvInputGroupComponent } from './molecules/ov-input-group.js';
import { OvTabsComponent } from './molecules/ov-tabs.js';
import { OvMenuItemComponent } from './molecules/ov-menu-item.js';
import { OvStatComponent } from './molecules/ov-stat.js';
import { OvToastComponent } from './molecules/ov-toast.js';
import { OvEmptyStateComponent } from './molecules/ov-empty-state.js';

import { OvNavBarComponent } from './organisms/ov-nav-bar.js';
import { OvHeroComponent } from './organisms/ov-hero.js';
import { OvCarouselComponent } from './organisms/ov-carousel.js';

import { OvPageLayoutComponent } from './templates/ov-page-layout.js';

const COMPONENTS = [
  OvButtonComponent,
  OvBadgeComponent,
  OvIconComponent,
  OvSpinnerComponent,
  OvInputComponent,
  OvTextareaComponent,
  OvLabelComponent,
  OvLinkComponent,
  OvNavLinkComponent,
  OvCheckboxComponent,
  OvRadioComponent,
  OvSwitchComponent,
  OvHeadingComponent,
  OvTextComponent,
  OvAvatarComponent,
  OvDividerComponent,
  OvFieldComponent,
  OvAlertComponent,
  OvCardComponent,
  OvImageCardComponent,
  OvBreadcrumbsComponent,
  OvInputGroupComponent,
  OvTabsComponent,
  OvMenuItemComponent,
  OvStatComponent,
  OvToastComponent,
  OvEmptyStateComponent,
  OvNavBarComponent,
  OvHeroComponent,
  OvCarouselComponent,
  OvPageLayoutComponent,
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class OvComponentsModule {}
