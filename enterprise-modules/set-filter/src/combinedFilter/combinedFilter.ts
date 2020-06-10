import { ProvidedFilter, Promise, ProvidedFilterModel, IDoesFilterPassParams, PostConstruct, RefSelector, IFilterParams, TextFilter, IAfterGuiAttachedParams } from '@ag-grid-community/core';
import { SetFilter } from '../setFilter/setFilter';

export class CombinedFilter extends ProvidedFilter {
    @RefSelector('eCombinedFilter') private readonly eCombinedFilter: HTMLElement;

    private providedFilter: ProvidedFilter;
    private setFilter: SetFilter;

    @PostConstruct
    protected postConstruct(): void {
        super.postConstruct();

        this.providedFilter = this.createManagedBean(new TextFilter());
        this.eCombinedFilter.appendChild(this.providedFilter.getGui());

        const divider = document.createElement('div');
        divider.style.borderBottom = 'solid 1px grey';
        this.eCombinedFilter.appendChild(divider);

        this.setFilter = this.createManagedBean(new SetFilter());
        this.eCombinedFilter.appendChild(this.setFilter.getGui());
    }

    public init(params: IFilterParams): void {
        this.providedFilter.init(params);
        this.setFilter.init(params);
    }

    public afterGuiAttached(params: IAfterGuiAttachedParams): void {
        this.providedFilter.afterGuiAttached(params);
        this.setFilter.afterGuiAttached(params);
    }

    public isFilterActive(): boolean {
        return this.providedFilter.isFilterActive() || this.setFilter.isFilterActive();
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {
        return (!this.providedFilter.isFilterActive() || this.providedFilter.doesFilterPass(params)) &&
            (!this.setFilter.isFilterActive() || this.setFilter.doesFilterPass(params));
    }

    protected updateUiVisibility(): void {
    }

    protected createBodyTemplate(): string {
        return `<div ref="eCombinedFilter"></div>`;
    }

    protected getCssIdentifier(): string {
        return 'combined-filter';
    }

    protected resetUiToDefaults(silent?: boolean): Promise<void> {
        return Promise.resolve();
    }

    protected setModelIntoUi(model: ProvidedFilterModel): Promise<void> {
        return Promise.resolve();
    }

    protected areModelsEqual(a: ProvidedFilterModel, b: ProvidedFilterModel): boolean {
        return false;
    }

    getModelFromUi(): ProvidedFilterModel {
        return null;
    }

    public getModel(): ProvidedFilterModel {
        return this.setFilter.getModel();
    }
}