import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "credentials",
})
export class Credential {
  @PrimaryGeneratedColumn("uuid")
  id_credential: string;
  @Column({ type: "varchar", nullable: false, length: 30, unique: true })
  username: string;
  @Column({ type: "varchar", nullable: false, length: 20 })
  password: string;
}
