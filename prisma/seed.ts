import { PrismaClient, UserRole } from "@prisma/client"
import * as bcrypt from "bcryptjs"
const prisma = new PrismaClient();

async function main() {
    const basePW = await bcrypt.hashSync("1234",10)
    try{
        const adminUser = await prisma.user.create({
            data:{
                email:"admin@test.com",
                name:"admin",
                password: basePW,
                role: UserRole.ADMIN,
                isApproval: true,
                emailVerified: new Date(),
            }
        })

        const stdUser = await prisma.user.create({
            data:{
                email:"std@test.com",
                name:"std",
                password: basePW,
                role: UserRole.STUDENT,
                isApproval: true,
                emailVerified: new Date(),
            }
        })

        const thUser = await prisma.user.create({
            data:{
                email:"th@test.com",
                name:"th",
                password: basePW,
                role: UserRole.THECHER,
                isApproval: true,
                emailVerified: new Date(),
            }
        })

    }catch(error){
        console.error('error message:', error)
    }finally {
        await prisma.$disconnect()
    }
}

main()