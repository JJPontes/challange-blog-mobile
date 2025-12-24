export type Role = 'professor' | 'aluno';

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
}
