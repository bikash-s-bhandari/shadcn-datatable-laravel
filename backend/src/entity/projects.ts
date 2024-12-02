import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { IProject } from "../interfaces/index";

@Entity({
  name: "projects",
  orderBy: {
    created_at: "ASC",
  },
})
export default class Project extends BaseEntity implements IProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", default: "" })
  name!: string;

  @Column({ type: "int" })
  project_manager_id!: number;

  @Column({ type: "text", default: "" })
  status!: string;

  @Column({ type: "date" })
  start_date!: Date;

  @Column({ type: "date" })
  end_date!: Date;

  @Column({ type: "text", default: "" })
  resources!: string[];

  @Column({ type: "int" })
  estimated_cost!: number;

  @Column({ type: "date" })
  last_updated!: Date;

  @CreateDateColumn({ select: false })
  created_at!: Date;

  @UpdateDateColumn({ select: false })
  updated_at!: Date;

  @DeleteDateColumn({ select: false })
  deleted_at!: Date;
}
