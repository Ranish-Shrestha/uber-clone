import { LocationModel } from "./LocationModel";

export interface AddressModel {
    id: Number;
    icon: String;
    name: String;
    address: String;
    location: LocationModel
} 