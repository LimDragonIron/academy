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

        const admin = await prisma.admin.create({
            data: {
                userId: adminUser.id
            }
        })

        const parentUser = await prisma.user.create({
            data:{
                email:"parent@test.com",
                name:"parent",
                password: basePW,
                role: UserRole.PARENTS,
                isApproval: true,
                emailVerified: new Date(),
            }
        })

        const parent = await prisma.parent.create({
            data: {
                userId: parentUser.id
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

        const std = await prisma.student.create({
            data:{
                userId: stdUser.id,
                parentId: parent.id
            }
        })

        const thUser = await prisma.user.create({
            data:{
                email:"th@test.com",
                name:"th",
                password: basePW,
                role: UserRole.TEACHER,
                isApproval: true,
                emailVerified: new Date(),
            }
        })

        const teacher = await prisma.teacher.create({
            data: {
                userId: thUser.id
            }
        })
        // GRADE
        for (let i = 1; i <= 6; i++) {
            await prisma.grade.create({
            data: {
                level: i,
            },
            });
        }

        // CLASS
        for (let i = 1; i <= 6; i++) {
            await prisma.class.create({
            data: {
                name: `${i}A`, 
                gradeId: i, 
                capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
            },
            });
        }

        // SUBJECT
        const subjectData = [
            { name: "Mathematics" },
            { name: "Science" },
            { name: "English" },
            { name: "History" },
            { name: "Geography" },
            { name: "Physics" },
            { name: "Chemistry" },
            { name: "Biology" },
            { name: "Computer Science" },
            { name: "Art" },
        ];

        for (const subject of subjectData) {
            await prisma.subject.create({ data: subject });
        }

        // EVENT
        for (let i = 1; i <= 5; i++) {
            await prisma.event.create({
            data: {
                title: `Event ${i}`, 
                description: `Description for Event ${i}`, 
                startTime: new Date(new Date().setHours(new Date().getHours() + 1)), 
                endTime: new Date(new Date().setHours(new Date().getHours() + 2)), 
                classId: (i % 5) + 1, 
            },
            });
        }

        // ANNOUNCEMENT
        for (let i = 1; i <= 5; i++) {
            await prisma.announcement.create({
            data: {
                title: `Announcement ${i}`, 
                description: `Description for Announcement ${i}`, 
                date: new Date(), 
                classId: (i % 5) + 1, 
            },
            });
        }

    }catch(error){
        console.error('error message:', error)
    }finally {
        await prisma.$disconnect()
    }
}

main()