import { PrismaClient } from "@prisma/client";


export const getUserById = async (id: number) => {
    const prismaClient = new PrismaClient()
    const user = await prismaClient.user.findFirst({
        where:{
            id: id
        }
    })

    return user
}
