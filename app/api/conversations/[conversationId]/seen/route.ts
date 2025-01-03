import getCurrentUser from "@/app/actions/getCurrentUser";
import { request } from "http";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

interface IParams {
    conversationId?: string;
}

export async function POST(
    request : Request,
    { params}: {params: IParams})
{
    try {
        const currentUser = await getCurrentUser();
        const {conversationId} = params;
        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse("Unauthorized" , {status:401});
        }

        //find existing conversation
        const conversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId,
            },
            include:{
                messages:{
                    include:{
                        seen:true
                    }
                },
                users:true
            }
        });

        if(!conversation){
            return new NextResponse("Invalid Id", {status:400});
        }

        //find the last message using existing conversation
        const lastMessage = conversation.messages[conversation.messages.length-1];
        if(!lastMessage){
            return NextResponse.json(conversation);
        }


        //update the last seen message
        const updateMessage = await prisma.message.update({
            where:{
                id: lastMessage.id,
            },
            include:{
                sender:true,
                seen:true
            },data:{
                seen:{
                    connect: {
                        id:currentUser.id
                    }
                }
            }
        });
        return NextResponse.json(updateMessage);
        
    } catch (error : any) {
        console.log(error, 'ERROR_MESSAGE_SEEN');
        return new NextResponse("Internal Error" , {status:500});
    }
}