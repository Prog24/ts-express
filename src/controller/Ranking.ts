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
    res.status(500).send({'message': err})
  })
}

const getAllRanking = async (req: express.Request, res: express.Response) => {
  const rankings = await RankingModel.find()
  res.send(rankings)
}

const getRankingByUser = async (req: express.Request, res: express.Response) => {
  const token = res.locals.jwtPayload
  const rankings = await RankingModel.find({ userId: token.id })
  res.send(rankings)
}

const getRankingByRankingId = async (req: express.Request, res: express.Response) => {
  const ranking = await getManager().connection
                          .getRepository(RankingModel)
                          .createQueryBuilder('ranking')
                          .where({ id: req.params.rankingId })
                          .leftJoinAndSelect('ranking.ranking_items', 'ranking_items')
                          .getOne()
  if (ranking === undefined) {
    res.status(404).send({'message':'404 Not Found'})
  } else {
    res.send(ranking)
  }
}


const deleteRankingById = async (req: express.Request, res: express.Response) => {
  const rankingId = req.params.rankingId
  const ranking = await RankingModel.findOne({ id: rankingId })
  if (ranking === undefined) {
    res.status(404).send({'message':'404 Not Found'})
  } else {
    if (ranking.userId !== res.locals.jwtPayload.id) {
      res.status(403).send({'message':'403 Forbidden'})
    } else {
      const rankingItems = await RankingItemModel.find({ rankingId: rankingId })
      await RankingModel.softRemove(ranking)
      await RankingItemModel.softRemove(rankingItems)
      res.send({'message':'ok'})
    }
  }
}

export { createRanking, getAllRanking, getRankingByUser, getRankingByRankingId, deleteRankingById }
