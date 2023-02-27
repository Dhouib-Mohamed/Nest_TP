import { Controller, Delete, Get, Patch, Post, Put } from "@nestjs/common";

@Controller('first')
export class FirstController {
  @Get()
  getGet(): string {
    console.log('get');
    return 'get';
  }
  @Post()
  getPost(): string {
    console.log('post');
    return 'post';
  }
  @Delete()
  getDelete(): string {
    console.log('delete');
    return 'delete';
  }
  @Put()
  getPut(): string {
    console.log('put');
    return 'put';
  }
  @Patch()
  getPatch(): string {
    console.log('patch');
    return 'patch';
  }
}
