import prisma from "./prismaClient";
export const createUser = async (name, email) => {
    try {
        const results = await prisma.users.create({
            data: { 
                name,
                email,
            },
        })
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Error in creating user')
    }
}