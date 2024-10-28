import { router } from '@app/router';
import { routeFactory } from '../factories';

export function Route(
  moduleName: keyof typeof router,
  routeName: string,
): MethodDecorator {
  const module = router[moduleName];
  if (!module) {
    throw new Error(`Module ${moduleName} not found in router.`);
  }

  const route = module.routes[routeName];
  if (!route) {
    throw new Error(`Route ${routeName} not found in module ${moduleName}.`);
  }

  return routeFactory(route.method, route.path);
}
