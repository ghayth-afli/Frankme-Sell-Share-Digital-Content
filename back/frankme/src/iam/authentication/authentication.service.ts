import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { HashingService } from "../hashing/hashing.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { ConfigType } from "@nestjs/config";
import jwtConfig from "../config/jwt.config";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.firstName = signUpDto.firstName;
      user.lastName = signUpDto.lastName;
      user.phone = signUpDto.phone;
      user.hashedPassword = await this.hashingService.hash(signUpDto.password);

      await this.usersRepository.save(user);
    } catch (err) {
      console.error(`Error in signUp authentication service : ${err}`);
      const pgUniqueViolationErrorCode = "23505";
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException("User exits with the given email");
      }
      throw err;
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.usersRepository.findOneBy({
        email: signInDto.email,
      });
      if (!user) {
        throw new UnauthorizedException("User does not exist");
      }
      const isEqual = this.hashingService.compare(
        signInDto.password,
        user.hashedPassword
      );
      if (!isEqual) {
        throw new UnauthorizedException("Password does not match");
      }
      return await this.generateTokens(user);
    } catch (err) {
      console.error(`Error in signIn authentication service : ${err}`);
      throw err;
    }
  }
  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(user.id, this.jwtConfiguration.accessTokenTtl, {
        email: user.email,
      }),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ]);
    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshTokensDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokensDto.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        }
      );

      const user = await this.usersRepository.findOneByOrFail({ id: sub });
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async signToken(userId: number, expiresIn: number, payload?) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      }
    );
  }
}
