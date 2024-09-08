import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}
  create(createOwnerInput: CreateOwnerInput) {
    const owner = new Owner();
    owner.name = createOwnerInput.name;

    return this.ownerRepository.save(owner);
  }

  findAll() {
    return this.ownerRepository.find({ relations: ['pets'] });
  }

  findOne(id: number) {
    return this.ownerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput) {
    await this.ownerRepository.update(id, updateOwnerInput);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.ownerRepository.delete(id);
  }
}
