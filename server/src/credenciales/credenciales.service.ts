import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Credenciales } from './entities';
import { CreateCredentialDto } from './dto/credenciales.dto';

@Injectable()
export class CredencialesService {
  constructor(
    @InjectRepository(Credenciales)
    private credencialesRepository: Repository<Credenciales>,
  ) {}

  async create(credential: CreateCredentialDto): Promise<CreateCredentialDto> {
    credential.password = await this.maskPassword(credential.password);
    const newRecord = this.credencialesRepository.create(credential);
    this.credencialesRepository.save(newRecord);
    return credential;
  }

  async findOne(codigo: string): Promise<CreateCredentialDto> {
    return this.credencialesRepository.findOne({ where: { codigo } });
  }

  async maskPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
