import { SelectedOption } from "../option/selected-option";

export interface Car {
    id: number | null;
    make: string;
    model: string;
    transmission: string;
    engine: string;
    fuelType: string;
    edition: string;
    price: number;
    selectedOptions: SelectedOption[];
}
