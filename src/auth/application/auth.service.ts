import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { User } from '../domain/user';
import { Logger } from 'tslog';
import { NotFoundException } from '../../common/exceptions';
import { handleError } from '../../common/handle.error';

const logger = new Logger();

export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async register(name: string, email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.create(name, email, password);
      const logUser = this.stripSensitiveInfo(user);
      const token = this.signToken(user.id!, user.email);
      return {
        token,
        user: logUser,
      };
    } catch (error) {
      handleError(error, logger);
    }
  }

  public async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findUserByEmailWithPassword(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.log(await bcrypt.compare(password, user.password));
        throw new NotFoundException('Usuario o contraseña incorrectos');
      }
      const logUser = this.stripSensitiveInfo(user);
      const token = this.signToken(user.id!, user.email);
      return {
        token,
        user: logUser,
      };
    } catch (error) {
      handleError(error, logger);
    }
  }

  private signToken(id: string, email: string): string {
    return jwt.sign(
      { id, email },
      process.env.SECRET_KEY!,
      { expiresIn: process.env.TOKEN_EXPIRY! }
    );
  }

  private stripSensitiveInfo(user: User): { name: string; email: string } {
    return {
      name: user.name,
      email: user.email
    };
  }
}
