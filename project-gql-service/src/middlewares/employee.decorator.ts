import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { EmployeeDecDTO } from './EmployeeDecDTO';

export const EmployeeDec = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = GqlExecutionContext.create(ctx);
    const request = req.getContext().req;
    const emp = request.employeeId.id;

    return JSON.stringify(
      {
        id: '47c48962-6661-4c78-a233-8048ba3e7fd9',
        firstName: 'Ayyoob',
        lastName: 'Ajward',
        designation: 'SWE Intern',
        city: 'Matara',
      },
      null,
      2,
    );
  },
);
