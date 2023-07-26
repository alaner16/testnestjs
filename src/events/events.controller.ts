import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Event } from 'src/interfaces/event/event.interface';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { plainToClass } from 'class-transformer';
import { EventsService } from 'src/services/events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() event: Event) {
    const res = this.eventsService.create(event);
    return res;
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('filter') filter?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    const res = await this.eventsService.findAll();
    let filteredData = res;
    let resp;

    if (filter) {
      filteredData = this.filter(filter, filteredData);
    }
    if (sortBy && sortOrder) {
      filteredData = this.sort(sortBy, sortOrder, filteredData);
    }
    if (page && pageSize) {
      resp = this.buildPagination(page, pageSize, filteredData);
    } else {
      resp = filteredData;
    }
    return resp;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const res = await this.eventsService.findById(parseInt(id));
    return res;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() event: Event) {
    const res = await this.eventsService.update(parseInt(id), event);
    return res;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const res = await this.eventsService.delete(parseInt(id));
    return res;
  }

  filter(filter: string, data) {
    return data.filter((dato) => {
      return dato.title.includes(filter) || dato.description.includes(filter);
    });
  }

  sort(sortBy: string, sortOrder: string, data) {
    return data.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue !== 'string' || typeof bValue !== 'string') {
        return 0;
      }

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }

  buildPagination(page, pageSize, filteredData) {
    const totalPages = Math.ceil(filteredData.length / pageSize);

    page = parseInt(page.toString(), 10);
    page = page < 1 ? 1 : page;

    pageSize = parseInt(pageSize.toString(), 10);
    pageSize = pageSize < 1 ? 10 : pageSize;

    const start = (page - 1) * pageSize;
    const end = page * pageSize;

    const paginatedData = filteredData.slice(start, end);

    const paginationDto = plainToClass(PaginationDto, {
      page,
      pageSize,
      totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    });

    return { ...paginationDto, data: paginatedData };
  }
}
