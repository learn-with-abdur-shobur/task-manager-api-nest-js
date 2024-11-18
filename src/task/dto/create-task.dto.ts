export class CreateTaskDto {
  title: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'done'; // Optional with default value
}
