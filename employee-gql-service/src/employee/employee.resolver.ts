import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Info,
  Context,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';
import { Project } from './entity/project.entity';
import { Location } from './entity/location.entity';
import { updateEmployeeDTO } from './dto/update-employee.input';
import { UseInterceptors } from '@nestjs/common';
import { AuthInterceptor } from './middlewares/auth.employee.Interceptor';
import { EmployeeDec } from './middlewares/employee.decorator';
import { EmployeeDecDTO } from './middlewares/EmployeeDecDTO';
// import { employeeFactory } from './middlewares/employee.decorator2';

@Resolver(() => Employee)
@UseInterceptors(AuthInterceptor)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  // @employeeFactory()
  @Query(() => [Employee], { name: 'getAllEmployees' })
  findAll(
    @Info() info,
    @EmployeeDec(['name', 'id']) emp: EmployeeDecDTO,
  ): Promise<Employee[]> {
    console.log('Employee', emp);
    const keys = info.fieldNodes[0].selectionSet.selections
      .filter((selection) => !selection.selectionSet)
      .map((item) => item.name.value);

    return this.employeeService.findAll();
  }

  @Query(() => Employee, { name: 'findEmployee' })
  findOne(@Args('id') id: string, @Info() info) {
    const keys = info.fieldNodes[0].selectionSet.selections
      .filter((selection) => !selection.selectionSet)
      .map((item) => item.name.value);

    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employeeInput') employee: EmployeeCreateDTO) {
    return this.employeeService.create(employee);
  }

  @Mutation(() => Employee, { name: 'deleteEmployee' })
  delete(@Args('id') id: string) {
    return this.employeeService.remove(id);
  }

  @ResolveField((of) => Project)
  project(@Parent() employee: Employee) {
    return { __typename: 'Project', id: employee.projectId };
  }

  @ResolveField((of) => Location)
  location(@Parent() employee: Employee) {
    return { __typename: 'Location', id: employee.locationId };
  }

  @Mutation(() => Employee, { name: 'updateEmployee' })
  update(@Args('updateEmployee') updateEmployee: updateEmployeeDTO) {
    return this.employeeService.update(updateEmployee.id, updateEmployee);
  }
}
