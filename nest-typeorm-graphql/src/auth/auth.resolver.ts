import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/app.type';
import { CurrentUserId } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { LoginGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() ctx: IContext,
  ) {
    const user = await this.authService.validateAuth(email, password);

    ctx.req.session.userId = user.id;
    return user;
  }

  @Query(() => Boolean)
  async logout(@Context() ctx: IContext) {
    delete ctx.req.session.userId;
    return true;
  }

  @Query(() => User)
  @UseGuards(LoginGuard)
  async me(@Context() ctx: IContext) {
    return User.findOne(ctx.req.session.userId);
  }
}
