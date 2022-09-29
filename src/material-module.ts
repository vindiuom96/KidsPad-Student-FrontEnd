import { NgModule } from '@angular/core';
// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTooltipModule } from '@angular/material/tooltip';

//Flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatTableModule,
    MatCardModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatDialogModule,
    MatIconModule,
    MatStepperModule,
    ScrollingModule,
    MatTooltipModule,
  ],
})
export class MaterialModule {}
