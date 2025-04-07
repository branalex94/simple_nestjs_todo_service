import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import configuration from '../configuration';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractTokenFromRequest(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      const payload = await this.jwtService.verifyAsync<{
        sub: string | number;
        username: string;
      }>(token, {
        secret: configuration().jwt_secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromRequest(req: Request): string | undefined {
    const headers = req.headers;
    if (typeof headers['authorization'] == 'string') {
      const [type, token] = headers['authorization'].split(' ');
      return type == 'Bearer' ? token : undefined;
    }
  }
}
