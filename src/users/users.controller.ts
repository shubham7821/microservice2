import { Body, Controller, Get, Post, UseGuards, Request, Param, NotFoundException, Put, Delete } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { UsersService } from './users.service';
import { UserRoles } from './user-roles.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async addUser(
    @Body('password') userPassword: string,
    @Body('email') userEmail: string,
    @Body('username') userName: string,
  ) {
    // Hash password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);

    // Register user with default role (User 1) and status 'pending'
    const result = await this.usersService.insertUser(
      userName,
      userEmail,
      hashedPassword,
    );

    return {
      msg: 'User successfully registered',
      userId: result.id,
      userEmail: result.email,
      userName: result.username,
      status: result.status, // Include status in the response
    };
  }

  // POST /login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    try {
      const { user } = req;
      const { id, username, role } = user; // Extract user details

      return {
        user: {
          id,
          username,
          role,
        },
        msg: 'User logged in',
      };
    } catch (error) {
      return { msg: 'Failed to log in' };
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }

  // @UseGuards(AuthenticatedGuard)
  // @Post('/approve-registration')
  // async approveRegistration(
  //   @Request() req,
  //   @Body('userId') userId: string,
  // ): Promise<any> {
  //   if (req.user.role !== UserRoles.User1) {
  //     return { msg: 'Unauthorized' };
  //   }

  //   const result = await this.usersService.updateRegistrationStatus(
  //     userId,
  //     'approved',
  //   );

  //   return { msg: 'Registration approved' };
  // }

  // @UseGuards(AuthenticatedGuard)
  // @Post('/reject-registration')
  // async rejectRegistration(
  //   @Request() req,
  //   @Body('userId') userId: string,
  //   @Body('comments') comments: string,
  // ): Promise<any> {
  //   if (req.user.role !== UserRoles.User1) {
  //     return { msg: 'Unauthorized' };
  //   }

  //   const result = await this.usersService.updateRegistrationStatus(
  //     userId,
  //     'rejected',
  //   );

  //   return { msg: 'Registration rejected' };
  // }



  // @Get()
  // async findAllUsers() {
  //   return await this.usersService.findAllUsers();
  // }

  // @Get(':id')
  // async findUserById(@Param('id') userId: string) {
  //   try {
  //     return await this.usersService.findUserById(userId);
  //   } catch (error) {
  //     throw new NotFoundException(error.message);
  //   }
  // }

  // @Put(':id')
  // async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
  //   try {
  //     return await this.usersService.updateUser(userId, updateUserDto);
  //   } catch (error) {
  //     throw new NotFoundException(error.message);
  //   }
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') userId: string) {
  //   try {
  //     await this.usersService.deleteUser(userId);
  //     return { message: 'User deleted successfully' };
  //   } catch (error) {
  //     throw new NotFoundException(error.message);
  //   }
  // }
}
