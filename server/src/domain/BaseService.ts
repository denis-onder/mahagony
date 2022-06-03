export default interface BaseService<T> {
  create(payload: T): Promise<T | null>;
  find(query: object): Promise<T | Array<T> | null>;
  findById(id: string): Promise<T | null>;
  update(id: string, payload: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
