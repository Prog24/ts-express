import express from 'express'
// import { getRepository } from 'typeorm'
import { getConnection, getManager } from 'typeorm'
import { Ranking as RankingModel } from 'src/entities/Ranking'
import { RankingItem as RankingItemModel } from 'src/entities/RankingItem'


const createRanking = async (req: express.Request, res: express.Response) => {
  const title = req.body.title
  const description = req.body.description
  const items = req.body.items
  const connection = getConnection()
  const queryRunner = connection.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()
  try {
    const ranking_model = new RankingModel()
    ranking_model.title = title
    ranking_model.description = description
    const save_ranking = await queryRunner.manager.save(ranking_model)
    items.forEach(async (item: any) => {
      const ranking_item_model = new RankingItemModel()
      ranking_item_model.title = item.title
      ranking_item_model.description = item.description
      ranking_item_model.ranking = save_ranking
      await queryRunner.manager.save(ranking_item_model)
    })
    await queryRunner.commitTransaction()
  } catch (err) {
    await queryRunner.rollbackTransaction()
  } finally {
    await queryRunner.release()
  }
}

// const createRanking = (req: express.Request, res: express.Response) => {
//   const title = req.body.title
//   const description = req.body.description
//   const items = req.body.items
//   const ranking_model = new RankingModel()
//   ranking_model.title = title
//   ranking_model.description = description
//   ranking_model.save().then(success => {
//     items.map((item: any) => {
//       const ranking_item_model = new RankingItemModel()
//       ranking_item_model.title = item.title
//       ranking_item_model.description = item.description
//       ranking_item_model.ranking = success
//       ranking_item_model.save()
//     })
//     res.send({'success':'OK'})
//   }).catch(err => {
//     res.send({'error': err.message})
//   })
// }

export { createRanking }
