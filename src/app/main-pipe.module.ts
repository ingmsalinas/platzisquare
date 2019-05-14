import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { LinkifystrPipe } from './pipes/linkifystr.pipe';

@NgModule({
    declarations: [LinkifystrPipe],
    imports: [CommonModule],
    exports: [LinkifystrPipe]
})

export class MainPipe { }