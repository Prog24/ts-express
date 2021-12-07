import express from 'express'
// import { getRepository } from 'typeorm'
import { Ranking as RankingModel } from 'src/entities/Ranking'
import { RankingItem as RankingItemModel } from 'src/entities/RankingItem'

const sample = (req: express.Request, res: express.Response) => {
  const title = req.body.title
  const description = req.body.description
  const items = req.body.items
  const ranking_model = new RankingModel()
  // const rankingItemRepository = getRepository(RankingItemModel)
  // const rankingItems = rankingItemRepository.create(items)
  // const ranking_items_model = new RankingItemModel()
  ranking_model.title = title
  ranking_model.description = description
  // ranking_model.ranking_items = items
  ranking_model.save().then(success => {
    res.send(success)
  }).catch(err => {
    res.send({'error': err.message})
  })
  // res.send({
  //   title: title,
  //   description: description
  // })
}

export { sample }
