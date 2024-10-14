import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    await this.clientRepository.save(createClientDto);
    return createClientDto;
  }

  findAll() {
    return this.clientRepository.find({
      relations: ['contacts'],
    });
  }

  findOne(id: number) {
    return this.clientRepository.findOne({
      where: { id },
      relations: ['contacts'],
    });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return await this.clientRepository.save({
      id,
      ...updateClientDto,
    });
  }

  async remove(id: number) {
    return await this.clientRepository.delete(id);
  }
}
