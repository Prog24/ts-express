import express from 'express'
// import { getRepository } from 'typeorm'
import { getConnection } from 'typeorm'
import { Ranking as RankingModel } from 'src/entities/Ranking'
import { RankingItem as RankingItemModel } from 'src/entities/RankingItem'

const sample = (req: express.Request, res: express.Response) => {
  const connection = getConnection()
  const title = req.body.title
  const description = req.body.description
  const items = req.body.items
  const ranking_model = new RankingModel()
  ranking_model.title = title
  ranking_model.description = description

  const ranking_items = items.map((item:any) => {
    const ranking_item_model = new RankingItemModel()
    ranking_item_model.title = item.title
    ranking_item_model.description = item.description
    return ranking_item_model
  })
  console.log(ranking_items)
  ranking_model.ranking_items = ranking_items

  connection.manager.save(ranking_model).then(success => {
    res.send(success)
  }).catch(err => {
    res.send({ 'error': err.message })
  })
  // ranking_model.save().then(success => {
  //   res.send(success)
  //   // items.forEach((item:any) => {
  //   //   const ranking_item_model = new RankingItemModel()
  //   //   ranking_item_model.title = item.title
  //   //   ranking_item_model.description = item.description
  //   //   ranking_item_model.ranking = success
  //   //   ranking_item_model.save().then(success => {
  //   //     // 
  //   //   }).catch(err => {
  //   //     res.send({ 'error': err.message })
  //   //   })
  //   // })
  //   // res.send({'success':'OK'})
  // }).catch(err => {
  //   res.send({'error': err.message})
  // })


  // res.send({
  //   title: title,
  //   description: description
  // })
}

export { sample }
