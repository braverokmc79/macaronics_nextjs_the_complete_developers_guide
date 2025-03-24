import type { Comment } from "@prisma/client";
import {db} from "@/db";

export type CommentWithAuthor =Comment & {
    user:{
        name:string|null;
        image:string|null;
    };
}

export function fetchCommentsByPostId(postId:string) :Promise<CommentWithAuthor[]> {

    return db.comment.findMany({
        where:{postId},
        include:{
            user:{
                select:{
                    name:true,
                    image:true,
                },
            },
        },
    });

    // TODO: Implement pagination for large comment lists

    // TODO: Add support for filtering comments by user ID

    // TODO: Add support for filtering comments by reply ID

    // TODO: Add support for sorting comments by creation date

    // TODO: Add support for fetching related comments (e.g., replies to a comment)

    // TODO: Add support for fetching comments with nested replies (e.g., replies to replies)

    // TODO: Add support for fetching comments with attachments (e.g., images or videos)

    // TODO: Add support for fetching comments with reactions (e.g., thumbs up or thumbs down)

}



 