import prisma from "./prismaClient";
export const updateuser = async (id, name, email) => {
try {
    const results = await prisma.users.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name :name,
            email:email,
        },
    })
    console.log(results)
    return results;
} catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
}    
 }