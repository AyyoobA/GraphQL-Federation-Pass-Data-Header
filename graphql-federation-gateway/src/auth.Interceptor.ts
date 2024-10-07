import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    // constructor(private jwtService?: JwtService){}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');
        const request = context.switchToHttp().getRequest()
        const payload = request?.header?.authorization
        // const decriptedToken = this.jwtService.verify(payload)
        // console.log(decriptedToken)
        // const now = Date.now();
        return next
          .handle()
          .pipe(
            tap(() => console.log(``)),
          );
    }
}