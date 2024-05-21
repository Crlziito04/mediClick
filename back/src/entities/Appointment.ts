import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
  name: "appointments",
})
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ nullable: false })
  time: string;

  @Column({ nullable: false, default: "active" })
  status: string;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;
}
