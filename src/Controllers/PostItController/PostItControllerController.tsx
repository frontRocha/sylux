import { PostItService } from "../../Services/PostItService/PostItService"
import { PostItItens } from "../../Interfaces/PostItInterface/PostItInterface"

export class PostItController {
    public async getPostIt(uid: string): Promise<PostItItens[]> {
        const result: PostItItens[] = await new PostItService().get(uid)

        return result
    }

    public async deletePostIt(id: string): Promise<void> {
        const result: void = await new PostItService().delete(id)

        return result
    }

    public async setPostIt(uid: string, title: string): Promise<void> {
        const result: void = await new PostItService().set(uid, title)

        return result
    }
}