import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const EmployeeDec = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = GqlExecutionContext.create(ctx);
    const request = req.getContext().req;
    const emp = request.employeeId

    return JSON.stringify(
      {
        id: emp.id,
        firstName: emp.firstName,
        lastName: emp.lastName,
        designation: emp.designation,
        city: emp.city,
      },
      null,
      2,
    );
  },
);
