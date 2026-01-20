import { UserCreateNestedOneWithoutRidesInput } from "generated/prisma/models/User"

export class CreateRideDto {
    arrival : string 
    departure : string
    userId : string
}
