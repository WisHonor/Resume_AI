import { currentUser } from "@clerk/nextjs/server"
import {prisma} from "@/lib/db"

export const syncUser = async () =>{
    const user = await currentUser();

    //checking for current logged in clerk user
    if(!user){
        return null;
    }

    //checking if already in databse
    const loggedInUser = await prisma.user.findUnique({
        where: {
            clerkId: user.id
        }
    });

    //if in database
    if(loggedInUser){
        return loggedInUser;
    }

    //if not in databse
    const newUser = await prisma.user.create({
        data:{
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress
        }
    });

    return newUser;


}