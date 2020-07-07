class CreateGraphicNovelCollections < ActiveRecord::Migration[6.0]
  def change
    create_table :graphic_novel_collections do |t|

      t.timestamps
    end
  end
end
