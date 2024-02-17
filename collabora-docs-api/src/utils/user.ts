import { PrismaClient } from "@prisma/client";


export const getUserById = async (id: number) => {
    const prismaClient = new PrismaClient()
    const user = await prismaClient.user.findUnique({
        where:{
            id: id
        }
    })

    return user
}
