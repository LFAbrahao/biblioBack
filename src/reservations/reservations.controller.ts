// src/reservations/reservations.controller.ts
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
    ParseIntPipe
  } from '@nestjs/common';
  import { ReservationsService } from './reservations.service';
  import { CreateReservationDto } from './dto/create-reservation.dto';
  import { UpdateReservationDto } from './dto/update-reservation.dto';
  import { Reservation } from './reservation.entity';
  
  @Controller('reservations')
  export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
      return this.reservationsService.create(createReservationDto);
    }
  
    @Get()
    async findAll(): Promise<Reservation[]> {
      return this.reservationsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Reservation> {
      return this.reservationsService.findOne(id);
    }
  
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateReservationDto: UpdateReservationDto,
    ): Promise<Reservation> {
      return this.reservationsService.update(id, updateReservationDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 para deleção bem sucedida
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.reservationsService.remove(id);
    }
  }