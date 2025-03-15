import {
  Repository,
  FindOptionsWhere,
  FindOneOptions,
  DeepPartial,
  ObjectLiteral,
} from "typeorm";

export abstract class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }
  async findById(id: string): Promise<T | null> {
    return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }
  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.findOne(options);
  }
  async create(data: DeepPartial<T>): Promise<T | null> {
    const entity = this.repository.create(data);
    return this.repository.save(entity as any);
  }
  async update(id: string, data: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    return this.findById(id);
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
