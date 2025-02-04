import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { ProjectResolver } from './project.resolver';
import { LocationResolver } from './location.resolver';
import { AuthInterceptor } from './middlewares/auth.employee.Interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeService, EmployeeResolver, ProjectResolver, LocationResolver, AuthInterceptor],
  exports: [EmployeeService]
})
export class EmployeeModule { }
