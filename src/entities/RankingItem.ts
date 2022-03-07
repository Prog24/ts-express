import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany, DeleteDateColumn } from 'typeorm'
import AnswerItem from './AnswerItem'
import Ranking from './Ranking'

@Entity()
export class RankingItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  // Rankingとの連携
  @Column()
  readonly rankingId!: string
  @ManyToOne(type => Ranking, ranking => ranking.ranking_items)
  @JoinColumn({ name: 'rankingId' })
  public ranking!: Ranking

  @Column({
    nullable: false
  })
  public title!: string

  @Column({
    nullable: false
  })
  public description!: string

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

  // AnswerItemとの連携
  @OneToMany(type => AnswerItem, answer_item => answer_item.ranking_item)
  public answer_items?: AnswerItem[]
}

export default RankingItem
