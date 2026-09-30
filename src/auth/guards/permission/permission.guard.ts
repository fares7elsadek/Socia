import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Permission } from '../../Models/permission.model.js';
import { PERMISSION_KEY } from '../../decorators/permission.decorator.js';
import { CONTEXT } from '@nestjs/graphql';
import { transpileModule } from 'typescript';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector:Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSION_KEY,
      [context.getClass(), context.getHandler()]
    );


    if(!requiredPermissions?.length){
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      return false;
    }


    return requiredPermissions.every(permission =>
      user.permissions?.includes(permission),
    );
  }
}
