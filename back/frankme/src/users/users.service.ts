import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findMe(user: ActiveUserData) {
    const { email } = user;
    const userRes = await this.userRepository.findOne({ where: { email } });
    return User.removeHashedPassword(userRes);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      await this.userRepository.delete({ id });
      return `User with id ${id} deleted`;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
