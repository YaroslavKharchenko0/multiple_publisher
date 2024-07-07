import { FileInterceptor } from "@nest-lab/fastify-multer"
import { UseInterceptors } from "@nestjs/common"

export const ImageUpload = () => {
  return UseInterceptors(FileInterceptor('image'))
}
