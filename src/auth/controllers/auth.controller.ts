import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/localguard/localguard.guard.js';
import { AuthService } from '../services/auth.service.js';
import { JwtAuthGuard } from '../guards/auth/auth.guard.js';
import { RequirePermissions } from '../decorators/permission.decorator.js';
import { Permission } from '../Models/permission.model.js';
import { PermissionGuard } from '../guards/permission/permission.guard.js';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(LocalAuthGuard)
    @Post('logout')
    async logout(@Request() req: any) {
        await new Promise<void>((resolve, reject) =>
            req.logout((err: any) => (err ? reject(err) : resolve())),
        );
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @RequirePermissions(Permission.UsersRead)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
