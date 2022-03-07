import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm'
import Answer from './Answer'
import RankingItem from './RankingItem'

@Entity()
export class AnswerItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  // Answerと連携
  @Column()
  readonly answerId!: string
  @ManyToOne(type => Answer, answer => answer.answer_items)
  @JoinColumn({ name: 'answerId' })
  public answer!: Answer

  // RankingItemと連携
  @Column()
  readonly ranking_itemId!: string
  @ManyToOne(type => RankingItem, ranking_item => ranking_item.answer_items)
  @JoinColumn({ name: 'ranking_itemId' })
  public ranking_item!: RankingItem

  @Column({
    nullable: false
  })
  public rank!: number

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
}

export default AnswerItem
