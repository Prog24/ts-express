import express from 'express'
import { getManager } from 'typeorm'
import { Ranking as RankingModel } from 'src/entities/Ranking'
import { RankingItem as RankingItemModel } from 'src/entities/RankingItem'
import { User as UserModel } from 'src/entities/User'

const createRanking = async (req: express.Request, res: express.Response) => {
  const title = req.body.title
  const description = req.body.description
  const items = req.body.items
  const token = res.locals.jwtPayload
  console.log(">>>", token)

  await getManager().transaction(async transactionEntityManager => {
    const user = await transactionEntityManager.findOne(UserModel, token.id)
    const ranking_model = new RankingModel()
    ranking_model.title = title
    ranking_model.user = user
    ranking_model.description = description
    const save_ranking = await transactionEntityManager.save(ranking_model)
    const item_save_promise = items.map(async (item: any) => {
      const ranking_item_model = new RankingItemModel()
      ranking_item_model.title = item.title
      ranking_item_model.description = item.description
      ranking_item_model.ranking = save_ranking
      return await transactionEntityManager.save(ranking_item_model)
    })
    await Promise.all(item_save_promise)
  }).then(success => {
    res.send({'success': 'ok'})
  }).catch(err => {
    res.send({'error': err})
  })
}

export { createRanking }
