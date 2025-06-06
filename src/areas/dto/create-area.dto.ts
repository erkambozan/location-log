import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  polygon: any; // GeoJSON formatında
}