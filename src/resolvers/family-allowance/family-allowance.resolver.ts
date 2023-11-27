import {Args, ID, Mutation, Query, Resolver} from "@nestjs/graphql";
import {FamilyAllowance} from "../../graphql-types";
import {FamilyAllowanceApi} from "../../services";
import {FamilyAllowanceModel, FamilyAllowanceStatus, FamilyAllowanceStatusFilter, mapFilterStatus} from "../../models";

@Resolver(of => FamilyAllowance)
export class FamilyAllowanceResolver {
    constructor(private readonly service: FamilyAllowanceApi) {}

    @Query(returns => [FamilyAllowance])
    async listFamilyAllowanceCases(
        @Args('status', { nullable: true, type: () => FamilyAllowanceStatusFilter }) status?: FamilyAllowanceStatusFilter
    ): Promise<FamilyAllowanceModel[]> {
        const filterStatus: FamilyAllowanceStatus | undefined = mapFilterStatus(status)

        return this.service.listFamilyAllowanceCases(filterStatus)
    }

    @Query(returns => FamilyAllowance)
    async getFamilyAllowanceCase(
        @Args('id', { type: () => ID }) id: string
    ): Promise<FamilyAllowanceModel> {
        return this.service.getFamilyAllowanceCase(id)
    }

    @Mutation(() => FamilyAllowance)
    async updateFamilyAllowanceStatus(
        @Args('id', { type: () => ID }) id: string,
        @Args('status', { type: () => FamilyAllowanceStatus }) status: FamilyAllowanceStatus
    ): Promise<FamilyAllowanceModel> {
        return this.service.updateFamilyAllowanceStatus(id, status)
    }
}