import { Global, Module } from "@nestjs/common";
import {v4 as uuid} from 'uuid';

export const PROVIDER_TOKENS = {
  uuid:'PROVIDER_TOKENS'
}
@Global()
@Module({
  providers: [
    {
      provide: PROVIDER_TOKENS.uuid,
      useValue: uuid,
    },
  ],
  exports: [
    {
      provide: PROVIDER_TOKENS.uuid,
      useValue: uuid,
    },
  ]
})
export class CommonModule {}
