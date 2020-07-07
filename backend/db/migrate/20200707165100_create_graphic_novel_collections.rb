class CreateGraphicNovelCollections < ActiveRecord::Migration[6.0]
  def change
    create_table :graphic_novel_collections do |t|
      t.references :user, null: false, foreign_key: true
      t.references :graphic_novel, null: false, foreign_key: true

      t.timestamps
    end
  end
end
