import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import Answer from './Answer'
import RankingItem from './RankingItem'

@Entity()
export class Ranking extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number

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

  // RankingItem(質問項目)との連携
  @OneToMany(type => RankingItem, ranking_item => ranking_item.ranking)
  public ranking_items?: RankingItem[]

  // Answer(回答)との連携
  @OneToMany(type => Answer, answer => answer.ranking, { cascade: ['insert', 'update'] })
  public answers?: Answer[]
}

export default Ranking
