// types.ts interface de tareas
export type PriorityType = 'Baja' | 'Media' | 'Alta';

export interface Task {
  id: string;
  text: string;
  priority: PriorityType;
  completed: boolean;
}