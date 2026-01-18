import { Module } from '@nestjs/common';
import { PasswordManagementService } from './password-management/password-management.service';

@Module({
    providers : [PasswordManagementService],
    exports : [PasswordManagementService]
})
export class CommonModule {}
