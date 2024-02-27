import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {HashingService} from "../hashing/hashing.service";
import {SignUpDto} from "./dto/sign-up.dto";
import {SignInDto} from "./dto/sign-in.dto";
import {NotFoundError} from "rxjs";

@Injectable()
export class AuthenticationService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
                private readonly hashingService: HashingService) {
    }

    async signUp(signUpDto: SignUpDto){
        try {
            const user = new User();
            user.email = signUpDto.email;
            user.firstName = signUpDto.firstName;
            user.lastName = signUpDto.lastName;
            user.phone = signUpDto.phone
            user.hashedPassword = await this.hashingService.hash(signUpDto.password)

            await this.usersRepository.save(user)
        } catch (err) {
            console.error(`Error in signUp authentication service : ${err}`)
            const pgUniqueViolationErrorCode = '23505';
            if (err.code === pgUniqueViolationErrorCode){
                throw new ConflictException()
            }
            throw err;
        }
        
    }

    async signIn(signInDto: SignInDto){
        try {
            const user = await this.usersRepository.findOneBy({email: signInDto.email})
            if (!user){
                throw new UnauthorizedException('User does not exist')
            }
            const isEqual = this.hashingService.compare(signInDto.password, user.hashedPassword)
            if (!isEqual){
                throw new UnauthorizedException('Password does not match')
            }
            // TODO: return token
            return true
        }catch (err) {
            console.error(`Error in signIn authentication service : ${err}`)
            throw err
        }

    }
}
