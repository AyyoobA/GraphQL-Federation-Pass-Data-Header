import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { Employee } from './entity/employee.entity';
import { updateEmployeeDTO } from './dto/update-employee.input';
import { EmployeeDec } from './middlewares/employee.decorator';
// import { EmployeeDec } from './middlewares/employee.decorator';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    // console.log("From service layer: ", employee)
    return this.employeeRepository.find();
  }

  async findOne(id: string) {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async create(employee: EmployeeCreateDTO): Promise<Employee> {
    let emp = this.employeeRepository.create(employee);
    return this.employeeRepository.save(emp);
  }

  async forProject(id: string) {
    return await this.employeeRepository.find({ where: { id } });
  }
  async forLocation(id: string) {
    return await this.employeeRepository.find({ where: { projectId: id } });
  }

  update(id: string, updateEmployeeDTO: updateEmployeeDTO) {
    let employee: Employee = this.employeeRepository.create(updateEmployeeDTO)
    employee.id = id;
    return this.employeeRepository.save(employee)
  }

  async remove(id: string) {
    let emp = this.findOne(id)
    if (emp) {
      let ret = await this.employeeRepository.delete(id)
      if (ret.affected === 1) {
        return emp;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`)
  }
}
