import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CredencialesService } from './credenciales.service';
import { CreateCredentialDto } from './dto/credenciales.dto';

@Controller('credenciales')
export class CredencialesController {
  constructor(private credencialesService: CredencialesService) {}

  @Post('crear')
  create(@Body() body: CreateCredentialDto): Promise<CreateCredentialDto> {
    return this.credencialesService.create(body);
  }

  @Get(':codigo')
  getOne(@Param('codigo') codigo: string): Promise<CreateCredentialDto> {
    return this.credencialesService.findOne(codigo);
  }
}
