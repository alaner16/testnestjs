// pagination.dto.ts
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @Expose()
  @IsNumber()
  total: number;

  @Expose()
  @IsNumber()
  page: number;

  @Expose()
  @IsNumber()
  pageSize: number;

  @Expose()
  @IsNumber()
  totalPages: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  nextPage?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  prevPage?: number;
}
