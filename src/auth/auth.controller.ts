import { Body, Controller, Headers, Post, UseGuards, Req, UnauthorizedException, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthMeDTO } from './dto/auth-me.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() {email, password}: AuthLoginDTO) {
    return this.authService.login(email, password)
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@User() user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }


  @Get('verify')
  isValidToken(@Headers('Authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];

    if (!token || !this.authService.isValidToken(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    return { message: 'Token is valid' };
  }
}