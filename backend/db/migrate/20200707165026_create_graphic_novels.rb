class CreateGraphicNovels < ActiveRecord::Migration[6.0]
  def change
    create_table :graphic_novels do |t|
      t.string :title
      t.string :author
      t.string :cover_art
      t.string :release_date
      t.string :summary
      t.timestamps
    end
  end
end
