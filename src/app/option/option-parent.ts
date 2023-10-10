import { SelectedOption } from "./selected-option";

export interface OptionParent {
    addOption(): void;
    removeOption(option: SelectedOption): void;
}