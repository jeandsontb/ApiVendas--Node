import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {
    public async update(request:Request, response:Response): Promise<Response> {

      const updateAvatar = new UpdateUserAvatarService();

      const user = await updateAvatar.execute({
        user_id: String(request.user.id),
        avatarFilename: request.file.fieldname,
      });

      return response.json(user);
  }
}