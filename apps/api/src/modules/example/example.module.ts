import { Module } from "@nestjs/common";

@Module({})
export class ExampleModule {
  static forRoot() {
    return {
      module: ExampleModule,
    };
  }
}
