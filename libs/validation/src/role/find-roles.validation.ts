import { Pagination, PaginationDto } from "../common";
import { Role } from "./role.validation";

export type FindRolesRequest = Pagination

export class FindRolesBodyDto extends PaginationDto { }

export type FindRolesResponse = Role[];
