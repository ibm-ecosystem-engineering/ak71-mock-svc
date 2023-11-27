import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

import {FamilyAllowance, FamilyAllowanceInput} from "./family-allowance.apitypes";
import {FamilyAllowanceModel, FamilyAllowanceStatus} from "../../models";
import {FamilyAllowanceApi, isFamilyAllowanceCaseNotFound} from "../../services";

@Controller('ak71')
@ApiTags('family-allowance')
export class FamilyAllowanceController {
    constructor(private readonly service: FamilyAllowanceApi) {}

    @Post()
    @ApiOperation({
        operationId: 'submit-case',
        summary: 'Add case',
        description: 'Add a case to the ak71 system'
    })
    @UseInterceptors(FileInterceptor('file'))
    async submitCase(@Body() input: FamilyAllowanceInput, @UploadedFile() file?: Express.Multer.File): Promise<FamilyAllowanceModel> {

        const newCase = Object.assign({}, input, {status: FamilyAllowanceStatus.Pending})

        if (newCase.id) {
            return this.service.updateFamilyAllowanceCase(newCase.id, newCase, file?.buffer)
                .catch(err => {
                    throw isFamilyAllowanceCaseNotFound(err)
                        ? new HttpException(err.message, HttpStatus.NOT_FOUND)
                        : new HttpException('Error updating case', HttpStatus.INTERNAL_SERVER_ERROR)
                })
        }

        return this.service.addFamilyAllowanceCase(newCase, file?.buffer)
            .catch(err => {
                throw new HttpException('Error adding case', HttpStatus.INTERNAL_SERVER_ERROR)
            })
    }

    @Get(':id')
    @ApiOperation({
        operationId: 'get-case',
        summary: 'Get case details',
        description: 'Get the family allowance case for the provided id'
    })
    @ApiParam({
        name: 'id',
        description: 'The id of the case'
    })
    @ApiOkResponse({
        type: FamilyAllowance,
        description: "Returns selected case"
    })
    async getFamilyAllowanceCase(@Param('id') id: string): Promise<FamilyAllowance> {
        console.log('Getting family allowance case: ' + id);

        return this.service.getFamilyAllowanceCase(id)
            .catch(err => {
                throw isFamilyAllowanceCaseNotFound(err)
                    ? new HttpException(err.message, HttpStatus.NOT_FOUND)
                    : new HttpException(`Error retrieving case: ${id}`, HttpStatus.INTERNAL_SERVER_ERROR)
            })

    }
}
