import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, tap } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LocationService } from 'src/location/location.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private locationService: LocationService) {}
  
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const gxl = GqlExecutionContext.create(context)
    const request = gxl.getContext().req

    const jwt = new JwtService();
    const secret = 'Ayyoob';

    const payload = jwt.decode(request?.header('authorization'))
    const employeeDetails = await this.locationService.findOne(payload.id)
    
    request['employeeId'] = employeeDetails

    return next.handle().pipe(tap(() => console.log()));
  }
}
