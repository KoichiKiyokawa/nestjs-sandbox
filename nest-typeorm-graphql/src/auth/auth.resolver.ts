import { Args, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Boolean)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    console.log({ email, password });
    await this.authService.validateAuth(email, password);
    return true;
  }
}
