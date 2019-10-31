import { ChangelogRoutingModule } from './changelog-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from './changelog/changelog.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [ChangelogComponent],
  imports: [
    ChangelogRoutingModule,
    CommonModule,
    MatExpansionModule
  ]
})
export class ChangelogModule { }
