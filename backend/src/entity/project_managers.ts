import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { IProjectManager } from "../interfaces/index";

@Entity({
  name: "project_managers",
  orderBy: {
    created_at: "ASC",
  },
})
export default class ProjectManager
  extends BaseEntity
  implements IProjectManager
{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", default: "" })
  name!: string;

  @Column({ type: "text", default: "" })
  email!: string;

  @Column({ type: "text", default: "" })
  phone!: string;

  @CreateDateColumn({ select: false })
  created_at!: Date;

  @UpdateDateColumn({ select: false })
  updated_at!: Date;

  @DeleteDateColumn({ select: false })
  deleted_at!: Date;
}
