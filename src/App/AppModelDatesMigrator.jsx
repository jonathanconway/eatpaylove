import { dateIndex } from '../utils'

export const migrate = model => {
  if (model && model.dates) {
    for (var key in model.dates) {
      if (isNaN(key)) {
        const dateAtKey = model.dates[key]

        if (dateAtKey && dateAtKey.items) {
          const correctDateIndexToMigrateTo = dateIndex(new Date(key))

          model.dates[correctDateIndexToMigrateTo] = 
            model.dates[correctDateIndexToMigrateTo] || {}
          
          model.dates[correctDateIndexToMigrateTo].items =
            model.dates[correctDateIndexToMigrateTo].items || []

          model.dates[correctDateIndexToMigrateTo].items = [
              ...model.dates[key].items,
              ...model.dates[correctDateIndexToMigrateTo].items
            ]
        }

        delete model.dates[key]
      }
    }
  }
  return model
}