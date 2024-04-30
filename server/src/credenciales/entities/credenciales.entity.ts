import { User } from 'src/users/entities';
import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';

@Entity()
export class Credenciales {
  @PrimaryColumn()
  codigo: string;

  @Column()
  password: string;

  @Column()
  correo: string;

  @OneToOne(() => User, (user) => user.credenciales)
  user: User;
}
