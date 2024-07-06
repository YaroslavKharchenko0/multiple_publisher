import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common"
import { Auth } from "./auth.decorator"
import { FileAccessGuard } from "../guards/file-access.guard"

export const FILE_ACCESS_KEY = 'FILE_ACCESS'

export type Options = {
  by: {
    user?: boolean
  },
  search: {
    fileId?: boolean
    providerId?: boolean
  }
}

export const FileAccess = (options: Options) => {
  return applyDecorators(Auth(), SetMetadata(FILE_ACCESS_KEY, options), UseGuards(FileAccessGuard))
}
