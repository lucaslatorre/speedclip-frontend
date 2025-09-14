import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiMockService, Plan} from '../../core/services/api-mock.service';
import {Observable} from 'rxjs';
import {ScButtonComponent} from '../../shared/components/ui/sc-button.component';

@Component({
    selector: 'sc-billing-page',
    standalone: true,
    imports: [CommonModule, ScButtonComponent],
    templateUrl: './billing-page.component.html',
    styleUrl: './billing-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingPageComponent {
    private api = inject(ApiMockService);
    plan$: Observable<Plan> = this.api.getPlan();

    set(tier: Plan['tier']) {
        this.api.setPlan(tier).subscribe();
    }
}

