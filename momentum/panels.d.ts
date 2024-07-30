interface PanelTagNameMap {
	MomentumMapSelector: MomentumMapSelector;
}

declare interface MomentumMapSelector extends AbstractPanel<'MomentumMapSelector'> {
	/** Gets the currently selected map's data. */
	selectedMapData: any; // Will do proper types for this eventually

	/**
	 * Applies the currently selected filters to the map selector, useful for
	 * applying batch-filter changes (like resetting filters or multi-toggling buttons).
	 */
	ApplyFilters(): void;
}
