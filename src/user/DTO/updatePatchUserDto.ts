import { UpdatePutUserDto } from "./updatePutUserDto";
import { PartialType} from '@nestjs/mapped-types'

export class UpdatePatchUserDto extends PartialType(UpdatePutUserDto){}