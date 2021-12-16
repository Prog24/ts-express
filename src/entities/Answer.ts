import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import AnswerItem from './AnswerItem'
import Ranking from './Ranking'

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  // Rankingとの連携
  @Column()
  readonly rankingId!: number
  @ManyToOne(type => Ranking, ranking => ranking.answers)
  @JoinColumn({ name: 'rankingId' })
  public ranking!: Ranking

  @Column({
    nullable: false
  })
  public name!: string

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

  // AnswerItemとの連携
  @OneToMany(type => AnswerItem, answer_item => answer_item.answer)
  public answer_items?: AnswerItem[]
}

export default Answer
