import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    console.log(
      '🚀 ~ file: roles.guard.ts ~ line 14 ~ RolesGuard ~ canActivate ~ requiredRoles',
      requiredRoles,
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: roles.guard.ts ~ line 18 ~ RolesGuard ~ canActivate ~ user',
      user,
    );
    return requiredRoles.some((role) => user?.role?.includes(role));
  }
}