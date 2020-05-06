import { NgModule } from '@angular/core';

import { MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule
} from '@angular/material';

import { NgSelectModule } from '@ng-select/ng-select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    exports: [MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatDatepickerModule,
        NgSelectModule,
        MatMomentDateModule,
        MatInputModule,
        MatButtonModule
    ]
})

export class MaterialModule {}
