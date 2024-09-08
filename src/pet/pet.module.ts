import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { Pet } from './entities/pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from 'src/owner/entities/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Owner])],
  providers: [PetResolver, PetService],
})
export class PetModule {}
