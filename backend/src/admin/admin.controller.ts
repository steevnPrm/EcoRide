import { Controller, Get, UseGuards, HttpException, HttpStatus, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from './admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AdminGuard)
  @Get('dashboard')
  async getData(@Req() req) {
    console.log(req.user);
    const users = await this.adminService.getUsers();
    return {
      success: true,
      data: users,
      currentUser: req.user,
    };
  }
}
