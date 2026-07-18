export interface PendingAction<T = unknown> {id: string; type: string; payload: T; createdAt: number; attempts: number}
export class PendingActionQueue {private actions: PendingAction[] = []; enqueue<T>(action: Omit<PendingAction<T>, 'attempts'>) {this.actions.push({...action, attempts: 0});} peek() {return this.actions[0];} complete(id: string) {this.actions = this.actions.filter(item => item.id !== id);} list() {return [...this.actions];}}
export const pendingActionQueue = new PendingActionQueue();
