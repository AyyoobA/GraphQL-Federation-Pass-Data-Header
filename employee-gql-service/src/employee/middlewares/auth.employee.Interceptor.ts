import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, tap } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private empService: EmployeeService) {}
  
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const gxl = GqlExecutionContext.create(context)
    const request = gxl.getContext().req

    const jwt = new JwtService();
    const secret = 'Ayyoob';
    const token = await request?.header('authorization')
    const payload = await jwt.decode(token)
    const employeeDetails = await this.empService.findOne(payload.id)
    
    request['employeeId'] = employeeDetails

    return next.handle().pipe(tap(() => console.log()));
  }
}
