import { Pagination } from '../common';
import { Role } from './role.validation';

export type FindRolesRequest = Pagination;

export type FindRolesResponse = Role[];
