import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany, DeleteDateColumn } from 'typeorm'
import { IsEmail } from 'class-validator'
import Ranking from './Ranking'

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column({
    nullable: false
  })
  @IsEmail()
  public email!: string

  @Column()
  public password!: string

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
  public created_at!: Date

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'
  })
  public updated_at!: Date

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(type => Ranking, ranking => ranking.user, { cascade: ['insert', 'update'] })
  public rankings?: Ranking[]
}

export default User
