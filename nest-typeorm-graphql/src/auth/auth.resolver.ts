import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/app.type';
import { User } from 'src/user/user.entity';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Boolean)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() ctx: IContext,
  ) {
    const user = await this.authService.validateAuth(email, password);

    ctx.req.session.userId = user.id;
    return true;
  }

  @Query(() => Boolean)
  async logout(@Context() ctx: IContext) {
    delete ctx.req.session.userId;
    return true;
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  async me(@Context() ctx: IContext) {
    return User.findOne(ctx.req.session.userId);
  }
}
