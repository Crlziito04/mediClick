import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 40, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 40, nullable: false, unique: true })
  email: string;

  @Column({ type: "date", nullable: false })
  birthDate: string;

  @Column({ type: "integer", nullable: false })
  nDni: number;

  @Column({ type: "uuid", nullable: false })
  id_credential: string;
  @OneToOne(() => Credential, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "id_credential" })
  credential: Credential;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}
