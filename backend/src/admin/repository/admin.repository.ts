import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class AdminRepository {
    constructor(
        private readonly prisma : PrismaService
    ){}

    async findAllUsers(){
        return await this.prisma.user.findMany({
            select : {
                firstname : true,
                lastname : true,
                username : true
            }
        })
    }
}
