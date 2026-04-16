import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const { user, token } = await this.authService.register(dto);
    this.setAuthCookie(res, token);
    return res.json({ user, token });
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { user, token } = await this.authService.login(dto);
    this.setAuthCookie(res, token);
    return res.json({ user, token });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('auth-token');
    return res.json({ message: 'Logged out' });
  }

  @Get('me')
  async me(@CurrentUser('sub') userId: string) {
    return this.authService.getProfile(userId);
  }

  private setAuthCookie(res: Response, token: string) {
    res.cookie('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
