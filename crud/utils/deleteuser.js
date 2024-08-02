import prisma from "./prismaClient"

export const deleteuser = async (id) => {
    try {
        const results = await prisma.users.delete({
            where: {
                id: parseInt(id),
            }
        })
        return results; 
    } catch (error) {
        console.error(error)
    }
}