import { router } from '@app/router';
import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ModuleRoute = (
  moduleName: keyof typeof router,
  apiVersion?: string,
) => {
  const module = router[moduleName];

  if (!module) {
    throw new Error(`Module ${moduleName} not found in router.`);
  }

  return applyDecorators(
    Controller({
      path: module.basePath,
      version: apiVersion,
    }),
    ApiTags(moduleName as string),
  );
};
