import { createServer, Model, Response } from 'miragejs';
import {  getRandomId } from '../utils/functions';
import { departments, names, positions } from '../utils/constants';

export const setupServer = (defaultEmployeesCount:number) => {
  
  createServer({
    models: {
      employee: Model,
    },
    seeds(server) {
      for (let i = 0; i < defaultEmployeesCount; i++) {
        const id = getRandomId(); 
        const name = names[i % names.length];
        const position = positions[i % positions.length];
        const department = departments[i % departments.length];

        server.create('employee', { id, name, position, department });
      }
    },
    routes() {
      this.namespace = 'api';

      this.get('/employees', (schema) => {
        return schema.all('employee');
      });

      this.post('/employees', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('employee', attrs);
      });

      this.put('/employees/:id', (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const employee = schema.find('employee', id);
        if (employee) { 
          employee.update(attrs);
          return employee;
        } else {
          return new Response(404, {}, { error: 'Employee not found' }); 
        }
      });

      this.delete('/employees/:id', (schema, request) => {
        const id = request.params.id;
        const employee = schema.find('employee', id);
        if (employee) {
          employee.destroy();
          return new Response(204);
        } else {
          return new Response(404, {}, { error: 'Employee not found' }); 
        }
      });
    },
  });
};