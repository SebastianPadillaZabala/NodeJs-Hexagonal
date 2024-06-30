import { AuthService } from "../../application/auth.service";
import { Body, Controller, Post, Route, Tags } from "tsoa";
import { UserRepositoryPrismaPgSQL } from "../user.repository";
import { UserService } from "../../application/user.service";
import { IResponseMessage } from "../../../common/response.message.interface";

@Route('/api/auth')
@Tags('Auth')
export class AuthController extends Controller {
    private readonly authService: AuthService;

    constructor() {
        super();
        const userRepository = new UserRepositoryPrismaPgSQL();
        const userService = new UserService(userRepository);
        this.authService = new AuthService(userService);
    }

    @Post('register')
    public async register(
        @Body() requestBody: { password: string; email: string; name: string }): Promise<IResponseMessage> {
        const { name, email, password } = requestBody;
        return {
            statusCode: 200,
            data: await this.authService.register(name, email, password)
        };
    }

    @Post('login')
    public async login(
        @Body() requestBody: { password: string; email: string }): Promise<IResponseMessage> {
        const { email, password } = requestBody;
        return {
            statusCode: 200,
            data: await this.authService.login(email, password)
        };
    }
}
