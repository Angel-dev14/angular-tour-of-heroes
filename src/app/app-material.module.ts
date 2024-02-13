import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

const imports = [
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
]

@NgModule({
  imports: [
    ...imports
  ],
  exports: [...imports]
})
export class AppMaterialModule {

}
