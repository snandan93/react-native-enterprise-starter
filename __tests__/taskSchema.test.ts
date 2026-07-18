import {taskSchema} from '../src/features/tasks/schemas/taskSchema';
describe('task schema',()=>{it('rejects incomplete tasks',()=>{expect(taskSchema.safeParse({title:'x',description:'short',assignee:'',status:'todo'}).success).toBe(false);});});
