import { HelloWorldController } from './hello-world';
import {FamilyAllowanceController} from "./family-allowance";

export * from './hello-world';
export * from './family-allowance';

export const controllers = [
    HelloWorldController,
    FamilyAllowanceController
];
