import { User, UserDto } from './user.validation'

export type UserCreatedRequest = User

export class UserCreatedBodyDto extends UserDto { }

export type UserCreatedResponse = null
