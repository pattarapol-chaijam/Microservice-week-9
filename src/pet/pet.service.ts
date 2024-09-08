import { Injectable } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { Owner } from 'src/owner/entities/owner.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}
  async create(createPetInput: CreatePetInput) {
    const pet = new Pet();
    pet.name = createPetInput.name;
    pet.age = createPetInput.age;
    const owner = await this.ownerRepository.findOne({
      where: { id: createPetInput.ownerId },
    });
    pet.owner = owner;
    return this.petRepository.save(pet);
  }

  findAll() {
    return this.petRepository.find({ relations: ['owner'] });
  }

  findOne(id: number) {
    return this.petRepository.findOne({ where: { id }, relations: ['owner'] });
  }

  async update(id: number, updatePetInput: UpdatePetInput) {
    await this.petRepository.update(id, updatePetInput);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.petRepository.delete(id);
  }
}
