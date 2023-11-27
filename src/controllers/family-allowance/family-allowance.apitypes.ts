import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

import {FamilyAllowanceModel, FamilyAllowanceStatus, FamilyAllowanceType} from "../../models";

export class FamilyAllowanceInput implements Omit<FamilyAllowanceModel, 'id' | 'status'> {
    @ApiPropertyOptional()
    id?: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    type: FamilyAllowanceType;
}

export class FamilyAllowance implements FamilyAllowanceModel {
    @ApiProperty()
    id: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    status: FamilyAllowanceStatus;
    @ApiProperty()
    type: FamilyAllowanceType;
}
