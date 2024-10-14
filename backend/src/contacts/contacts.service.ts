import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}
  async create(createContactDto: CreateContactDto) {
    await this.contactRepository.save(createContactDto);
    return createContactDto;
  }

  findAll() {
    return this.contactRepository.find({
      relations: ['client'],
    });
  }

  findOne(id: number) {
    return this.contactRepository.findOne({
      where: { id },
      relations: ['client'],
    });
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    return await this.contactRepository.save({
      id,
      ...updateContactDto,
    });
  }

  async remove(id: number) {
    return await this.contactRepository.delete(id);
  }
}
