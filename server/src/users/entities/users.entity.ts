import { Credenciales } from 'src/credenciales/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ nullable: false })
  codigo: string;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  strikes: number;

  @Column({ nullable: false })
  imagenPerfil: string;

  @CreateDateColumn({ nullable: false })
  creadoEn: Date;

  @UpdateDateColumn({ nullable: false })
  actualizadoEn: Date;

  @OneToOne(() => Credenciales, (credencial) => credencial.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'codigo' })
  credenciales: Credenciales;

  //implementar relacion con libros
}
