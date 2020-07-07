class CreateNovelCollections < ActiveRecord::Migration[6.0]
  def change
    create_table :novel_collections do |t|

      t.timestamps
    end
  end
end
