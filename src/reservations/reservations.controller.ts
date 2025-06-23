import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './reservation.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @Roles('admin', 'bibliotecaria', 'user')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @Roles('admin', 'bibliotecaria')
  async findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'bibliotecaria', 'user')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'bibliotecaria')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @Roles('admin', 'bibliotecaria')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.reservationsService.remove(id);
  }
}