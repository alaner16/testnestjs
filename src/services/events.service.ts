import { Injectable } from '@nestjs/common';
import { Event } from 'src/interfaces/event/event.interface';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
@Injectable()
export class EventsService {

  async create(event: Event) {
    const res = await prisma.events.create({data: event});
    return res;
  }

  async findAll() {
    const res = await prisma.events.findMany();
    return res;
  }

  async findById(eventId: number) {
    const res = await prisma.events.findFirst({
        where: {id: eventId}
    });
    return res;
  }

  async update(eventId: number, event: Event) {
    const res = await prisma.events.update({
        where: {id: eventId},
        data: event
    })
    return res;
  }

  async delete(eventId: number) {
    const res = await prisma.events.delete({
        where: {id: eventId}
    })
    return res;
  }
}
